# Signal Routing System

A comprehensive signal-to-engine routing system for intelligent AI processing.

## Overview

The Signal Routing System automatically directs different signal types to their optimal processing engines, enabling specialized analysis and extraction across multiple domains.

## Quick Start

### Using as a Library

```javascript
import { routeSignal, getRoutingTable } from './signal-router.js';

// Route a single signal
const result = routeSignal('Tommy_Vectors');
console.log(result);
// Output:
// {
//   signalType: 'Tommy_Vectors',
//   engine: 'Behavior_Forecasting',
//   description: 'Behavioral pattern analysis and prediction using Tommy_Vectors',
//   capabilities: ['pattern_recognition', 'predictive_analytics', 'temporal_analysis'],
//   frameworks: ['JEDI_ABCDE-BAYES', 'Monte_Carlo_Simulations'],
//   routedAt: '2026-01-27T06:52:00.000Z'
// }

// Display routing table
console.log(getRoutingTable());
```

## Supported Signal Types

| Signal Type | Primary Engine | Use Case |
|-------------|----------------|----------|
| `Tommy_Vectors` | Behavior_Forecasting | User behavior prediction and pattern recognition |
| `TCO_Reporting` | Operational_Efficiency | Total Cost of Ownership analysis |
| `Tone_Analyzer` | Legal_Semantics | Legal document tone and semantic analysis |
| `Numeric_Anomalies` | Bayesian_Truth_Engine | Statistical anomaly detection |
| `Contracts` | Clause_Extraction | Contract clause identification |
| `Claims` | Evidence_Verifier | Claims validation and verification |
| `Events` | Timeline_Tensorizer | Event sequencing and temporal analysis |
| `Policies` | Compliance_Mapper | Policy compliance checking |
| `Parenti_Interpretation` | Political_Economy_Analyzer | Economic imperialism, drug policy critique, and critics analysis |

## API Reference

### Core Functions

#### `routeSignal(signalType)`
Routes a signal to its appropriate processing engine.

**Parameters:**
- `signalType` (string): Type of signal to route

**Returns:** Object with engine details, capabilities, and metadata

**Example:**
```javascript
const result = routeSignal('Contracts');
// Returns engine: 'Clause_Extraction' with full details
```

#### `batchRouteSignals(signalTypes)`
Route multiple signals in a single call.

**Parameters:**
- `signalTypes` (array): Array of signal type strings

**Returns:** Array of routing results

**Example:**
```javascript
const results = batchRouteSignals(['Tommy_Vectors', 'Claims', 'Events']);
// Returns array of 3 routing results
```

#### `getAvailableSignalTypes()`
Get list of all supported signal types.

**Returns:** Array of signal type strings

#### `getAvailableEngines()`
Get list of all available processing engines.

**Returns:** Array of engine names

#### `getEngineDetails(engineName)`
Get detailed information about a specific engine.

**Parameters:**
- `engineName` (string): Name of the engine

**Returns:** Object with engine capabilities and frameworks

#### `isValidSignalType(signalType)`
Check if a signal type is supported.

**Parameters:**
- `signalType` (string): Signal type to validate

**Returns:** Boolean

#### `getRoutingTable()`
Get formatted routing table as a string.

**Returns:** Formatted string table

#### `executeMasterPrompt(signalType)`
Execute the master prompt for a signal.

**Parameters:**
- `signalType` (string): Signal type to process

**Returns:** Object with master prompt and execution steps

## Running Tests

```bash
cd /home/runner/work/superpowers/superpowers
node tests/signal-routing/test-signal-router.js
```

All tests should pass with output showing:
- ✓ Configuration loading
- ✓ Signal routing for all 8 signal types
- ✓ Batch routing
- ✓ Error handling
- ✓ Master prompt execution

## Architecture

The system implements the SuperGrok Expert-level Mastery Roadmap for 2026, featuring:

- **JEDI_ABCDE-BAYES** framework integration
- **Monte Carlo Simulations** for uncertainty quantification
- **BANTA-ANTARCTICA** methodologies
- **Forecasting and Mining** capabilities
- **Survival analysis** for predictive models

### Master Prompt

```
Route[Signal_Type] → Execute[Primary_Engine] → Synthesize[SuperGrok_Insights]
```

## Configuration

The routing configuration is stored in `signal-engine-mapping.json`. To add new signal types:

1. Add mapping to `mappings` object
2. Add engine details to `engines` object
3. Update tests to include new signal type

## Integration with Superpowers

This skill integrates seamlessly with the Superpowers skills library:

- Trigger automatically when analyzing data signals
- Use in conjunction with other skills like `systematic-debugging`
- Leverage for decision support in `brainstorming` sessions

## License

MIT License - Part of the Superpowers project
