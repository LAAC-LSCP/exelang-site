+++
date = '2026-04-03T00:48:57+02:00'
draft = false
title = 'Addressee Classifier'
headless = true
+++

## Addressee Classifier

A machine learning model for automatically detecting child-directed speech in long-form recordings.

{{< note >}}
**Use Case:** "I want to identify which adult speech in my recordings is directed at the key child, versus at other people"

The Addressee Classifier takes adult speech segments from a long-form recording and classifies each one as key-child directed speech (KCDS), adult-directed speech (ADS), or other/overheard speech. It runs as a two-step pipeline: VTC2 first segments the audio by speaker type, then a fine-tuned BabyHuBERT model classifies the adult segments. The model has been specifically trained on child-centered long-form recordings from children aged 0 to 5.
{{< /note >}}

{{< link-buttons >}}
{{< link-button
        title="View on GitHub"
        left_icon="github"
        href="https://github.com/LAAC-LSCP/addressee"
    >}}
{{< /link-buttons >}}

{{< iframe
    src=" https://laac-lscp.github.io/addressee/"
    title="Addressee Documentation"
    height="480"
>}}
