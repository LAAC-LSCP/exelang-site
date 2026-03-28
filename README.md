# ELSI Website

This repository contains the codebase for the ELSI website.

## Adding Content

As a general rule, all text is in markdown and JSON files. In markdown, it is either in the body or in the TOML-formatted preamble. It's usually self-evident from the surrounding context how to change the text, or how to add/remove parts of the website. Hugo, along with some custom plumbing, makes sure to transpile the markdown and TOML to the appropriate HTML.

Hugo allows for custom "themes". It's best practice to put markdown, stylesheets, and custom web components into the theme. To keep things simple, I've kept virtually all the HTML and CSS in the `/elsi-theme` folder. If you only want to change the text or add/remove certain things in the website, you can probably ignore this folder entirely and focus purely on the files inside the following folders:

- `/content`: text-based content written as markdown files, with TOML-based preamble. These are transpiled by Hugo into HTML
- `/static`: static files, such as images
- `/data`: more volatile/changing data, such as a list of publications and conference presentations. More "static" data is kept inside the TOML-based preamble inside the markdown files

## Support

#### Sometimes I don't see my changes?

I have fingerprinted the CSS files, so browsers don't typically resort to the cache. But sometimes they do. Clearing the cache and doing a hard refresh usually solves this problem.

#### How do I quickly find the code that relates to what I want to do?

All the code in this repository is basically HTML and CSS and some plumbing. We also have markdown files.

My general rules for this repository were:

- All markup is in HTML files
- All styling is inside .scss files
- All visible text throughout the website can be found in .json or .md files, and can easily be found with a search

#### I want to learn more about Hugo

I used the following book to understand this technology: https://learning.oreilly.com/library/view/build-websites-with/9781680507904/. I highly recommend learning Hugo if you want to make your own blog, your own online resumé, or an organizational website. It's very fun and powerful. It can do a lot more than what I've done.

## Deployment

### GitHub Actions Secrets for Deployment

NOTE! To enable automated deployment via GitHub Actions, you must add the following repository secrets:

- **UPLOAD_TARGET**: The rsync target string (e.g., user@host:/var/www/elsi-site/current)
- **DEPLOYMENT_KEY**: The private SSH key (contents, not a path) used for deployment

You can add these secrets in your repository settings under **Settings > Secrets and variables > Actions**.

We have an automated deployment pipeline set up. For completeness, I include the steps here, although the GitHub actions are the "definitive" source of documentation as far as deployment is concerned.

### Deployment: Uploading with SSH and Environment Variables

The upload script uses rsync over SSH and expects the destination to be set via the UPLOAD_TARGET environment variable. A DEPLOYMENT_KEY variable is also used, referring to the name of the ed25519 key pair (private key should be kept secure).

#### Setting up the deployment user remotely

```bash
sudo adduser website-deployer
```

We will disable password login later for security. You can leave all fields blank.

Now login to the user and set up the ssh directory.

```bash
sudo su - website-deployer
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

Now **locally** generate an ed25519 public and private key pair. No need for an SSH passphrase.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/elsi_site_deploy_key -C "elsi-site-deploy-key"
```

Copy the public key

```bash
cat ~/.ssh/elsi_site_deploy_key.pub
```

Now **on the node** paste the public key.

```bash
vim ~/.ssh/authorized_keys;
chmod 600 ~/.ssh/authorized_keys;
```

Now **locally**, you should be able to start an interactive session into the cluster:

```bash
ssh -i ~/.ssh/elsi_site_deploy_key website-deployer@[my IP]
```

Note that a static external IP is a must-have at this point.

Now **on the node**, as a best practice, remove password login from the user `website-deployer`. Check your password configuration. The system administrator or cloud service likely already defaulted it to "no".

```bash
cat /etc/ssh/sshd_config | grep PasswordAuthentication | head -n 1  # should say "no"
cat /etc/ssh/sshd_config | grep PermitRootLogin | head -n 1 # should say "no"
```

If you have changed this file, continue by running `sudo systemctl restart ssh`.

#### Setting the Upload Target

On the **remote node**, run

```bash
sudo mkdir -p /var/www/elsi-site/current;
sudo chown -R website-deployer:website-deployer /var/www/elsi-site/current;
```

Now **locally**, before running the upload script, set the UPLOAD_TARGET environment variable to your remote destination. For example:

```bash
export UPLOAD_TARGET=deploy@[external IP]:/var/www/elsi-site/current
export DEPLOYMENT_KEY=elsi_site_deploy_key  # preferably stick to this name
```

Now set up npm and Webpack as outlined in the development section. Ensure you run the production build:

```bash
NODE_ENV=production npx webpack
```

To upload to the remote run

```bash
npm run build
npm run upload
```

On the remote, check that the files have been correctly transferred to the upload target path. There should be an `index.html` file in the `current` folder.

#### Setting up nginx as your web server

We will use nginx as the secure web server to serve the markup. The installation steps I have taken from the nginx cookbook 3rd ed. at https://learning.oreilly.com/library/view/nginx-cookbook-3rd/9781098158422/. I recommend switching to the root user for the following steps. All this is happening on the remote node.

On Debian/Ubuntu:

```bash
# Use latest package information
apt update
# Install helper packages
apt install -y curl gnupg2 ca-certificates lsb-release \
    debian-archive-keyring

# Download and store the nginx signing key
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
  | tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

# Create an apt source file configured for your machine
OS=$(lsb_release -is | tr '[:upper:]' '[:lower:]')
RELEASE=$(lsb_release -cs)
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
    http://nginx.org/packages/${OS} ${RELEASE} nginx" \
    | tee /etc/apt/sources.list.d/nginx.list

# Update package listings, and install
apt update
apt install -y nginx
systemctl enable nginx
nginx
```

Nginx is now installed and started, and will automatically start up with the node. Verify with `nginx -v`. Confirm that it runs: `ps -ef | grep nginx`—you will see one daemon and one or more workers (one per CPU core, I believe). If all went well, `curl localhost` will return the markup of the default nginx homepage.

If the `curl` check worked, then nginx is working and serving content. Now double check the web server is remotely accessible: visit `http://[external IP]` in your browser. You should see some content. If the browser hangs or otherwise fails, the port is likely blocked by your firewall; configure a rule to allow incoming traffic.

## Configuring nginx

You'll find the configuration file at `/etc/nginx/conf.d/default.conf`. Edit it with your editor of choice. Ignoring the error page configuration, set:

```
root /var/www/elsi-site/current;
index index.html;
```

Double check the configuration with `sudo nginx -t`, reload with `sudo systemctl reload nginx`, and visit `http://[external IP]` in your browser. You should now see the ELSI page!

## Development

This project uses Hugo (a static site generator), JavaScript, SCSS, and npm for development. It also uses automated linting and formatting tools to ensure code quality and consistency.

### Local Development

1. **Install Hugo:**
   - Download and install Hugo from https://gohugo.io/installation/.
   - Verify installation with `hugo --help`.

2. **Install Node.js and npm:**
   - Use Node Version Manager (nvm): https://github.com/nvm-sh/nvm
   - Run `nvm install node` to get the latest version.

3. **Install Project Dependencies:**
   - In the root of the repository, run:
     ```bash
     npm install
     ```

4. **Run the Development Server:**
   - Start the Hugo and Webpack dev servers:
     ```bash
     npm run dev
     ```
   - The site will be served at http://localhost:1313/ and will watch for changes.

5. **Build for Production:**
   - Run:
     ```bash
     NODE_ENV=production npx webpack
     npm run build
     ```

### Linting, Formatting, and Fixing

To ensure code quality, use the following npm scripts:

- **Lint JavaScript:** `npm run lint:js`
- **Lint SCSS:** `npm run lint:css`
- **Check formatting:** `npm run check-format`
- **Auto-fix issues:** `npm run fix`

The `fix` script will attempt to automatically fix issues in JavaScript, SCSS, and Markdown formatting using ESLint, Stylelint, and Prettier.

### Continuous Integration (CI)

You can use the provided npm scripts for linting, formatting, and building in your CI system of choice. See the scripts section in package.json for details.

#### Notes

- The JavaScript source code lives in `themes/elsi-theme/assets/js/main.js` and is bundled by Webpack into `themes/elsi-theme/assets/js/app.js`.
- All styling is inside `.scss` files in the theme assets.
- All visible text throughout the website can be found in `.json` or `.md` files.
