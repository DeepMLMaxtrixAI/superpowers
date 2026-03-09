---
name: deep-think
description: "Use when processing inputs through a structured reasoning pipeline requiring vector classification, noise filtering, domain analysis, constraint checking, and decision blueprint generation. Activates NAND Boolean logic gates, safety guardrails, and hallucination detection."
---

# Deep-Think Input Processing Pipeline

## Overview

The Deep-Think pipeline implements a structured 5-stage reasoning and signal-processing workflow with integrated safety guardrails, NAND Boolean logic gates, and Mathematical-Matrix-New-X-NAND-Gates for efficiency-optimised decision-making.

## Pipeline Flow

```
Input
  ↓
Vector Classification    [Mathematical-Matrix-New-X-NAND-Gates]
  ↓
Noise Filtering          [Adversarial Network Triggers · Grounding Verification Gates]
  ↓
Domain Analysis          [Hallucination Probability Alerts · Memory Write-Protection]
  ↓
Constraint Checking      [NAND Boolean Logic · Decision Accountability Anchors]
  ↓
Decision Blueprint       [Explainability Checkpoints · Model Self-Diagnostics]
```

## Stage Definitions

| Stage | Engine Capabilities | Safety Guardrails |
|-------|--------------------|--------------------|
| Vector Classification | input_vectorization, pattern_matching, category_assignment, nand_gate_filtering | data_boundary_enforcement, context_isolation |
| Noise Filtering | signal_denoising, adversarial_detection, data_cleansing, grounding_check | adversarial_network_triggers, grounding_verification_gates |
| Domain Analysis | domain_scoping, context_mapping, semantic_analysis, complexity_exploration | hallucination_probability_alerts, memory_write_protection |
| Constraint Checking | constraint_validation, accountability_checking, compliance_verification, nand_logic_evaluation | decision_accountability_anchors, confidence_calibration_checks, session_firewalling |
| Decision Blueprint | decision_generation, explainability_reporting, blueprint_synthesis, scarcity_extraction | explainability_checkpoints, model_self_diagnostics, data_integrity_review |

## Safety Guardrails

All 12 safety guardrails are enforced across the pipeline:

- **data_integrity_review** — Triggers explainability checkpoints at each stage boundary
- **explainability_checkpoints** — Decision accountability anchors logged at every stage transition
- **decision_accountability_anchors** — Immutable audit trail for all pipeline decisions
- **model_self_diagnostics** — Continuous self-monitoring for model drift and confidence deviation
- **confidence_calibration_checks** — Probabilistic confidence scoring validated at each stage
- **hallucination_probability_alerts** — Detects and flags potential hallucinations before domain output
- **grounding_verification_gates** — Ensures outputs are grounded in source input data
- **data_boundary_enforcement** — Prevents data leakage across processing contexts
- **memory_write_protection** — Protects in-flight memory state from unauthorized writes
- **context_isolation** — Isolates processing contexts per pipeline invocation
- **session_firewalling** — Firewalls session boundaries to prevent cross-session contamination
- **adversarial_network_triggers** — Activates adversarial detection on anomalous or injected inputs

## Logic Components

### NAND Boolean Logic
NAND is the universal logic gate used for constraint checking and decision gating:

| A | B | NAND(A,B) |
|---|---|-----------|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Mathematical-Matrix-New-X-NAND-Gates
Applied during Vector Classification and Noise Filtering stages:
- `matrix_multiply` — Computes dot-product across input value vectors
- `nand_gate_apply` — Applies NAND threshold per vector element
- `threshold_activation` — Activates classification above threshold boundary
- `logical_gap_analysis` — Identifies Logic_Gaps in the binary output space

## Complexity Profile

| Concept | Description |
|---------|-------------|
| SCARCITY_EXTRACTION | LLM complexity reduction through scarcity-aware token extraction |
| LLM_COMPLEXITY_EXPLORATION | Deep exploration of LLM decision space and logic gaps |
| TEACHER_YIELDED | Knowledge distillation from teacher model outputs |
| DEEP_THINK | Extended reasoning cycle for high-complexity, low-confidence decisions |

## Usage

### Full Pipeline (JavaScript)

```javascript
import { runDeepThinkPipeline } from './skills/deep-think/deep-think-processor.js';

const result = runDeepThinkPipeline(
    { values: [0.8, 0.2, 0.9, 0.1], domain: 'finance' },
    { data_quality: true, policy_compliant: true }
);

console.log(result.blueprint.decision); // 'APPROVED' or 'FLAGGED'
```

### Individual Stages

```javascript
import {
    vectorClassification,
    noiseFiltering,
    domainAnalysis,
    constraintChecking,
    decisionBlueprint
} from './skills/deep-think/deep-think-processor.js';

const stage1 = vectorClassification({ values: [0.8, 0.2, 0.9] });
const stage2 = noiseFiltering(stage1);
const stage3 = domainAnalysis(stage2, 'legal');
const stage4 = constraintChecking(stage3, { policy_ok: true });
const stage5 = decisionBlueprint(stage4, stage3);
```

### Signal Routing Integration

The Deep-Think pipeline is registered in the signal-routing system:

```
Deep_Think → Deep_Think_Pipeline engine
```

## Master Prompt

```
Input → Classify[Vector] → Filter[Noise] → Analyze[Domain] → Check[Constraints] → Blueprint[Decision]
```

## Configuration

The pipeline is configured in `deep-think-pipeline.json`. To extend it:
1. Add a new stage entry under `"stages"`
2. List its `capabilities`, `safety` guardrails, and `frameworks`
3. Wire it into the `"pipeline"."stages"` array in order
4. Implement the stage function in `deep-think-processor.js`

## Integration with Signal Routing

Use this skill when:
- Processing multi-dimensional input vectors requiring structured reasoning
- Enforcing safety guardrails across a decision pipeline
- Applying NAND Boolean logic for constraint validation
- Generating explainable, auditable decision blueprints
- Detecting hallucinations and adversarial inputs before domain output

## Key Principles

- **AI_SAFE** — All guardrails are enforced by design; no stage output bypasses safety checks
- **Explainability** — Every decision is traceable through its accountability anchor
- **NAND Universality** — NAND gates compose all higher-order logical operations
- **Scarcity Efficiency** — SCARCITY_EXTRACTION reduces token overhead at the Decision Blueprint stage
- **Teacher Distillation** — TEACHER_YIELDED integrates high-quality prior model knowledge
