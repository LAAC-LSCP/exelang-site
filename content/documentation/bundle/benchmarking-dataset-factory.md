+++
date = '2026-04-03T00:48:57+02:00'
draft = false
title = 'Benchmarking Dataset Factory'
headless = true
+++

## Benchmarking Dataset Factory

A pipeline for building custom benchmarking datasets for supervised machine learning models, using human-annotated long-form recording data.

{{< note >}}
**Use Case:** "I want to train or evaluate a speech model and need a clean, standardised dataset drawn from human-annotated child recordings"

The Benchmarking Dataset Factory lets you combine annotation data across multiple long-form recording corpora into a single, ready-to-use benchmarking dataset. It supports four annotation types — voice type classification, vocalization/speech maturity, addressee, and transcription — and handles the messy work of harmonising column names across datasets, filtering recordings, and splitting data into train/test/validation sets. Datasets are built in the ChildProject format, making them compatible with the rest of the ExELang toolchain.
{{< /note >}}

{{< link-buttons >}}
{{< link-button
        title="View on GitHub"
        left_icon="github"
        href="https://github.com/LAAC-LSCP/benchmarking-dataset-factory"
    >}}
{{< /link-buttons >}}
