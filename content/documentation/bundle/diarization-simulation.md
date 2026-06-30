+++
date = '2026-04-03T00:48:57+02:00'
draft = false
title = 'Diarization Simulation'
headless = true
+++

## Diarization Simulation

A Python package for testing how classification errors in automated speaker diarization affect your research findings.

{{< note >}}
**Use Case:** "I want to check whether the patterns I found in my data could be artifacts of diarization errors rather than real effects"

Diarization algorithms like LENA and VTC can misclassify speakers — for example, confusing child and female adult voices — and these errors can silently distort downstream analyses. Diarization Simulation lets you provide your ground truth vocalization data and simulate what those algorithms would actually measure, so you can assess how sensitive your findings are to classification errors.
{{< /note >}}


{{< iframe
    src="https://github.com/LAAC-LSCP/diarization-simulation"
    title="Diarization Simulation"
    height="480"
>}}
