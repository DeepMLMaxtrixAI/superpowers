/**
 * Tests for Signal-to-Engine Router
 * 
 * Validates the routing system for all signal types and engines
 */

import { strict as assert } from 'assert';
import {
    loadSignalEngineMapping,
    routeSignal,
    getAvailableSignalTypes,
    getAvailableEngines,
    getEngineDetails,
    batchRouteSignals,
    getRoutingTable,
    isValidSignalType,
    getSystemMetadata,
    executeMasterPrompt
} from '../../skills/signal-routing/signal-router.js';

console.log('Starting Signal Router Tests...\n');

// Test 1: Load configuration
console.log('Test 1: Load signal-engine mapping configuration');
try {
    const config = loadSignalEngineMapping();
    assert(config.version === '1.0.0', 'Config version should be 1.0.0');
    assert(config.mappings, 'Config should have mappings');
    assert(config.engines, 'Config should have engines');
    console.log('✓ Configuration loaded successfully\n');
} catch (error) {
    console.error('✗ Configuration loading failed:', error.message);
    process.exit(1);
}

// Test 2: Route individual signals
console.log('Test 2: Route individual signals to engines');
const testSignals = [
    { signal: 'Tommy_Vectors', expectedEngine: 'Behavior_Forecasting' },
    { signal: 'TCO_Reporting', expectedEngine: 'Operational_Efficiency' },
    { signal: 'Tone_Analyzer', expectedEngine: 'Legal_Semantics' },
    { signal: 'Numeric_Anomalies', expectedEngine: 'Bayesian_Truth_Engine' },
    { signal: 'Contracts', expectedEngine: 'Clause_Extraction' },
    { signal: 'Claims', expectedEngine: 'Evidence_Verifier' },
    { signal: 'Events', expectedEngine: 'Timeline_Tensorizer' },
    { signal: 'Policies', expectedEngine: 'Compliance_Mapper' }
];

try {
    testSignals.forEach(({ signal, expectedEngine }) => {
        const result = routeSignal(signal);
        assert(result.engine === expectedEngine, 
            `${signal} should route to ${expectedEngine}, got ${result.engine}`);
        assert(result.signalType === signal, 'Signal type should be preserved');
        assert(result.description, 'Result should include engine description');
        assert(result.capabilities, 'Result should include capabilities');
        assert(result.routedAt, 'Result should include routing timestamp');
        console.log(`✓ ${signal} → ${result.engine}`);
    });
    console.log('✓ All signals routed correctly\n');
} catch (error) {
    console.error('✗ Signal routing failed:', error.message);
    process.exit(1);
}

// Test 3: Get available signal types
console.log('Test 3: Get available signal types');
try {
    const signalTypes = getAvailableSignalTypes();
    assert(Array.isArray(signalTypes), 'Should return an array');
    assert(signalTypes.length === 8, 'Should have 8 signal types');
    assert(signalTypes.includes('Tommy_Vectors'), 'Should include Tommy_Vectors');
    assert(signalTypes.includes('Policies'), 'Should include Policies');
    console.log(`✓ Found ${signalTypes.length} signal types: ${signalTypes.join(', ')}\n`);
} catch (error) {
    console.error('✗ Get signal types failed:', error.message);
    process.exit(1);
}

// Test 4: Get available engines
console.log('Test 4: Get available engines');
try {
    const engines = getAvailableEngines();
    assert(Array.isArray(engines), 'Should return an array');
    assert(engines.length === 8, 'Should have 8 engines');
    assert(engines.includes('Behavior_Forecasting'), 'Should include Behavior_Forecasting');
    assert(engines.includes('Compliance_Mapper'), 'Should include Compliance_Mapper');
    console.log(`✓ Found ${engines.length} engines: ${engines.join(', ')}\n`);
} catch (error) {
    console.error('✗ Get engines failed:', error.message);
    process.exit(1);
}

// Test 5: Get engine details
console.log('Test 5: Get engine details');
try {
    const engineDetails = getEngineDetails('Bayesian_Truth_Engine');
    assert(engineDetails.name === 'Bayesian_Truth_Engine', 'Should have correct name');
    assert(engineDetails.description, 'Should have description');
    assert(Array.isArray(engineDetails.capabilities), 'Should have capabilities array');
    assert(engineDetails.capabilities.includes('anomaly_detection'), 
        'Should include anomaly_detection capability');
    console.log('✓ Engine details retrieved correctly\n');
} catch (error) {
    console.error('✗ Get engine details failed:', error.message);
    process.exit(1);
}

// Test 6: Batch routing
console.log('Test 6: Batch route multiple signals');
try {
    const signals = ['Tommy_Vectors', 'Contracts', 'Events'];
    const results = batchRouteSignals(signals);
    assert(Array.isArray(results), 'Should return an array');
    assert(results.length === 3, 'Should have 3 results');
    assert(results[0].engine === 'Behavior_Forecasting', 'First should be Behavior_Forecasting');
    assert(results[1].engine === 'Clause_Extraction', 'Second should be Clause_Extraction');
    assert(results[2].engine === 'Timeline_Tensorizer', 'Third should be Timeline_Tensorizer');
    console.log('✓ Batch routing successful\n');
} catch (error) {
    console.error('✗ Batch routing failed:', error.message);
    process.exit(1);
}

// Test 7: Invalid signal type handling
console.log('Test 7: Handle invalid signal types');
try {
    const results = batchRouteSignals(['Tommy_Vectors', 'InvalidSignal', 'Contracts']);
    assert(results.length === 3, 'Should return all results');
    assert(results[0].engine === 'Behavior_Forecasting', 'Valid signals should route');
    assert(results[1].error, 'Invalid signal should have error');
    assert(results[2].engine === 'Clause_Extraction', 'Valid signals should route');
    console.log('✓ Invalid signals handled correctly\n');
} catch (error) {
    console.error('✗ Invalid signal handling failed:', error.message);
    process.exit(1);
}

// Test 8: Get routing table
console.log('Test 8: Get formatted routing table');
try {
    const table = getRoutingTable();
    assert(typeof table === 'string', 'Should return a string');
    assert(table.includes('Signal_Type'), 'Should include header');
    assert(table.includes('Tommy_Vectors'), 'Should include Tommy_Vectors');
    assert(table.includes('Behavior_Forecasting'), 'Should include Behavior_Forecasting');
    assert(table.includes('→'), 'Should include arrow separator');
    console.log('Routing Table:\n' + table);
    console.log('✓ Routing table generated correctly\n');
} catch (error) {
    console.error('✗ Get routing table failed:', error.message);
    process.exit(1);
}

// Test 9: Validate signal types
console.log('Test 9: Validate signal types');
try {
    assert(isValidSignalType('Tommy_Vectors') === true, 'Tommy_Vectors should be valid');
    assert(isValidSignalType('Contracts') === true, 'Contracts should be valid');
    assert(isValidSignalType('InvalidSignal') === false, 'InvalidSignal should be invalid');
    console.log('✓ Signal type validation works correctly\n');
} catch (error) {
    console.error('✗ Signal validation failed:', error.message);
    process.exit(1);
}

// Test 10: Get system metadata
console.log('Test 10: Get system metadata');
try {
    const metadata = getSystemMetadata();
    assert(metadata.architecture, 'Should have architecture');
    assert(metadata.year === '2026', 'Should be for year 2026');
    assert(metadata.master_prompt, 'Should have master prompt');
    assert(metadata.methodologies, 'Should have methodologies');
    assert(metadata.methodologies.includes('JEDI_ABCDE-BAYES'), 
        'Should include JEDI_ABCDE-BAYES');
    console.log('✓ System metadata retrieved correctly\n');
} catch (error) {
    console.error('✗ Get metadata failed:', error.message);
    process.exit(1);
}

// Test 11: Execute master prompt
console.log('Test 11: Execute master prompt');
try {
    const execution = executeMasterPrompt('Numeric_Anomalies');
    assert(execution.masterPrompt, 'Should have master prompt');
    assert(execution.execution, 'Should have execution details');
    assert(execution.execution.step1_route === 'Numeric_Anomalies', 
        'Should route correct signal');
    assert(execution.execution.step2_execute === 'Bayesian_Truth_Engine', 
        'Should execute correct engine');
    assert(execution.execution.step3_synthesize === 'SuperGrok_Insights', 
        'Should synthesize with SuperGrok');
    console.log(`✓ Master prompt executed: ${execution.masterPrompt}\n`);
} catch (error) {
    console.error('✗ Master prompt execution failed:', error.message);
    process.exit(1);
}

console.log('='.repeat(50));
console.log('✓ All tests passed successfully!');
console.log('='.repeat(50));
