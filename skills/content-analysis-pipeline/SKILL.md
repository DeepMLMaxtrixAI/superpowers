---
name: content-analysis-pipeline
description: "Use when analysing posts, lectures, or news content through a 9-stage pipeline: transcript extraction, semantic parsing, vector classification, PRISM-RAG evidence retrieval, propaganda/bias detection, narrative frame analysis, signal scoring, and decision reporting."
---

# Content Analysis Pipeline

## Overview

A sequential 9-stage pipeline that ingests raw content (posts, lectures, news) and produces a structured decision report, with dedicated AI engines at every step.

```
INPUT CONTENT
(posts / lectures / news)

↓
TRANSCRIPT EXTRACTION
(video → text)

↓
SEMANTIC PARSING

↓
VECTOR CLASSIFICATION

↓
PRISM-RAG EVIDENCE RETRIEVAL

↓
PROPAGANDA / BIAS DETECTOR

↓
NARRATIVE FRAME ANALYSIS

↓
SIGNAL SCORING

↓
DECISION REPORT
```

## Pipeline Stages

| # | Stage | Signal | Engine |
|---|-------|--------|--------|
| 1 | INPUT CONTENT | `Content_Input` | `Transcript_Extractor` |
| 2 | TRANSCRIPT EXTRACTION | `Content_Input` | `Transcript_Extractor` |
| 3 | SEMANTIC PARSING | `Transcript` | `Semantic_Parser` |
| 4 | VECTOR CLASSIFICATION | `Parsed_Semantics` | `Vector_Classifier` |
| 5 | PRISM-RAG EVIDENCE RETRIEVAL | `Vector_Features` | `PRISM_RAG_Retriever` |
| 6 | PROPAGANDA / BIAS DETECTOR | `Evidence_Bundle` | `Propaganda_Bias_Detector` |
| 7 | NARRATIVE FRAME ANALYSIS | `Bias_Analysis` | `Narrative_Frame_Analyzer` |
| 8 | SIGNAL SCORING | `Narrative_Frame` | `Signal_Scorer` |
| 9 | DECISION REPORT | `Scored_Signal` | `Decision_Reporter` |

> **Note:** Stages 1 and 2 both use the `Content_Input` signal and the `Transcript_Extractor` engine. Stage 1 represents the pipeline entry point where raw content is received; Stage 2 is the active transcript-extraction pass where the same engine converts the content to text. Both are handled by a single engine, reflecting the fact that content ingestion and transcription are one atomic operation.

## Engine Descriptions

### Transcript_Extractor
Converts video, audio, and multimedia content into structured text transcripts with timestamp alignment and speaker diarization.

**Capabilities:** speech_to_text, video_transcription, timestamp_alignment, speaker_diarization  
**Frameworks:** ASR_Pipeline, Media_Processing

### Semantic_Parser
Parses transcripts into semantic units — claims, entities, themes, and intent.

**Capabilities:** entity_extraction, claim_detection, theme_identification, intent_parsing  
**Frameworks:** NLP_Semantic, Dependency_Parsing

### Vector_Classifier
Encodes semantic units into vector embeddings and classifies them by topic and stance.

**Capabilities:** embedding_generation, topic_classification, stance_detection, similarity_scoring  
**Frameworks:** Dense_Retrieval, Transformer_Embeddings

### PRISM_RAG_Retriever
Retrieves corroborating or contradicting evidence from a curated knowledge base using PRISM-RAG.

**Capabilities:** evidence_retrieval, knowledge_grounding, source_ranking, context_augmentation  
**Frameworks:** PRISM_RAG, Dense_Passage_Retrieval

### Propaganda_Bias_Detector
Detects propaganda techniques, cognitive biases, and rhetorical manipulation patterns.

**Capabilities:** propaganda_detection, bias_identification, rhetorical_analysis, manipulation_scoring  
**Frameworks:** PTDC_Taxonomy, Cognitive_Bias_Models

### Narrative_Frame_Analyzer
Identifies the overarching narrative frames and framing strategies used in the content.

**Capabilities:** frame_detection, narrative_mapping, framing_strategy_analysis, ideological_tagging  
**Frameworks:** Framing_Theory, Narrative_Analysis

### Signal_Scorer
Aggregates pipeline outputs into a composite signal score across multiple dimensions.

**Capabilities:** score_aggregation, multi_dimensional_scoring, confidence_weighting, threshold_flagging  
**Frameworks:** Weighted_Scoring, Bayesian_Aggregation

### Decision_Reporter
Generates a structured decision report summarising findings, evidence, and recommended actions.

**Capabilities:** report_generation, finding_summarisation, recommendation_synthesis, audit_trail_creation  
**Frameworks:** Structured_Reporting, Evidence_Synthesis

## Usage

### Run the full pipeline

```javascript
import { runPipeline } from './skills/content-analysis-pipeline/pipeline.js';

const result = runPipeline({
    type: 'news',
    source: 'https://example.com/article',
});

console.log(result.summary);
// { totalStages: 9, enginesInvolved: [...], inputType: 'news', ... }
```

### Get the pipeline diagram

```javascript
import { getPipelineDiagram } from './skills/content-analysis-pipeline/pipeline.js';

console.log(getPipelineDiagram());
```

### Inspect the routing map

```javascript
import { getPipelineRoutingMap } from './skills/content-analysis-pipeline/pipeline.js';

const map = getPipelineRoutingMap();
// { Content_Input: 'Transcript_Extractor', Transcript: 'Semantic_Parser', ... }
```

## Integration with Signal Routing

Every pipeline stage is registered as a signal type in `signal-engine-mapping.json` and is routable via `signal-router.js`. This means the pipeline composes seamlessly with the broader signal-routing system.

```javascript
import { routeSignal } from './skills/signal-routing/signal-router.js';

const route = routeSignal('Evidence_Bundle');
// { engine: 'Propaganda_Bias_Detector', capabilities: [...], ... }
```

## Supported Input Types

| Type | Description |
|------|-------------|
| `post` | Social media posts, blog articles, forum threads |
| `lecture` | Recorded talks, academic lectures, conference presentations |
| `news` | News articles, press releases, broadcast transcripts |

## Key Principles

- **Sequential Flow** — Outputs of each stage feed the next; no stage is skipped
- **Engine Specialisation** — Each stage uses a purpose-built AI engine
- **Evidence-Grounded** — PRISM-RAG grounds all analysis in retrieved evidence
- **Bias-Aware** — Propaganda and framing detection runs before scoring
- **Auditable** — Every stage is logged with routing timestamp for full traceability
- **AI_SAFE** — All operations comply with the AI_SAFE protocol
