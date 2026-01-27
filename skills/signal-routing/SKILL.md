---
name: signal-routing
description: "Routes incoming signals to their appropriate processing engines based on signal type. Use when analyzing data signals, behavioral patterns, legal documents, contracts, claims, events, or policy compliance."
---

# Signal-to-Engine Routing System

## Overview

Automatically routes different signal types to specialized AI processing engines for optimal analysis and extraction.

## Signal-to-Engine Mappings

The system provides intelligent routing based on signal type:

| Signal Type | Primary Engine | Purpose |
|-------------|----------------|---------|
| Tommy_Vectors | Behavior_Forecasting | Behavioral pattern analysis and prediction |
| TCO_Reporting | Operational_Efficiency | Total Cost of Ownership analysis and optimization |
| Tone_Analyzer | Legal_Semantics | Legal document tone and semantic analysis |
| Numeric_Anomalies | Bayesian_Truth_Engine | Statistical anomaly detection using Bayesian inference |
| Contracts | Clause_Extraction | Contract clause identification and extraction |
| Claims | Evidence_Verifier | Claims validation and evidence verification |
| Events | Timeline_Tensorizer | Event sequencing and temporal analysis |
| Policies | Compliance_Mapper | Policy compliance mapping and verification |

## How It Works

When a signal is received:

1. **Signal Type Detection** - Identifies the incoming signal type
2. **Engine Selection** - Routes to the appropriate processing engine
3. **Processing** - Engine performs specialized analysis
4. **Result Aggregation** - Combines outputs for comprehensive insights

## Use Cases

### Behavior Forecasting (Tommy_Vectors)
- User behavior prediction
- Pattern recognition in temporal data
- Predictive analytics for decision-making

### Operational Efficiency (TCO_Reporting)
- Cost optimization analysis
- Resource utilization metrics
- Efficiency improvement recommendations

### Legal Semantics (Tone_Analyzer)
- Legal document analysis
- Tone and sentiment in legal contexts
- Semantic understanding of legal language

### Bayesian Truth Engine (Numeric_Anomalies)
- Statistical anomaly detection
- Probabilistic truth assessment
- Data quality verification

### Clause Extraction (Contracts)
- Automated contract parsing
- Key clause identification
- Terms and conditions extraction

### Evidence Verifier (Claims)
- Factual claim validation
- Evidence strength assessment
- Source credibility analysis

### Timeline Tensorizer (Events)
- Event sequence analysis
- Temporal pattern detection
- Timeline reconstruction

### Compliance Mapper (Policies)
- Policy compliance checking
- Regulatory mapping
- Compliance gap analysis

## Advanced Features

### SuperGrok Integration
- Expert-level mastery of domain-specific analysis
- Blueprint design for decision-making processes
- Best practices application across all engines

### Forecasting & Mining
- JEDI_ABCDE-BAYES framework integration
- Monte Carlo simulations for uncertainty quantification
- Survival analysis for predictive models
- Raw challenge identification and resolution

### Master Prompt Architecture
Unified 1-line master prompt for 2026:
```
Route[Signal_Type] → Execute[Primary_Engine] → Synthesize[SuperGrok_Insights]
```

## Configuration

The routing table is defined in `signal-engine-mapping.json`:

```json
{
  "version": "1.0.0",
  "mappings": {
    "Tommy_Vectors": "Behavior_Forecasting",
    "TCO_Reporting": "Operational_Efficiency",
    "Tone_Analyzer": "Legal_Semantics",
    "Numeric_Anomalies": "Bayesian_Truth_Engine",
    "Contracts": "Clause_Extraction",
    "Claims": "Evidence_Verifier",
    "Events": "Timeline_Tensorizer",
    "Policies": "Compliance_Mapper"
  }
}
```

## Integration

Use this skill when:
- Processing multi-signal data streams
- Requiring specialized AI analysis
- Building intelligent routing systems
- Implementing expert-level decision support

## Key Principles

- **Automatic Routing** - Signals are automatically directed to optimal engines
- **Specialized Processing** - Each engine is optimized for its signal type
- **Comprehensive Analysis** - Multiple signal types can be processed in parallel
- **Scalable Architecture** - Easily extensible for new signal types and engines
