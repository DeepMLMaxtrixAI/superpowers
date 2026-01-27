/**
 * Example Usage: Signal-to-Engine Router
 * 
 * Demonstrates various ways to use the signal routing system
 */

import {
    routeSignal,
    batchRouteSignals,
    getRoutingTable,
    getAvailableSignalTypes,
    getAvailableEngines,
    getEngineDetails,
    executeMasterPrompt,
    getSystemMetadata
} from './signal-router.js';

console.log('='.repeat(60));
console.log('Signal-to-Engine Router - Example Usage');
console.log('='.repeat(60));
console.log();

// Example 1: Route a single signal
console.log('Example 1: Route a single signal');
console.log('-'.repeat(60));
const behaviorResult = routeSignal('Tommy_Vectors');
console.log('Signal:', behaviorResult.signalType);
console.log('Engine:', behaviorResult.engine);
console.log('Description:', behaviorResult.description);
console.log('Capabilities:', behaviorResult.capabilities.join(', '));
console.log('Frameworks:', behaviorResult.frameworks.join(', '));
console.log();

// Example 2: Batch route multiple signals
console.log('Example 2: Batch route multiple signals');
console.log('-'.repeat(60));
const signals = ['Contracts', 'Claims', 'Policies'];
const batchResults = batchRouteSignals(signals);
batchResults.forEach(result => {
    console.log(`${result.signalType} → ${result.engine}`);
});
console.log();

// Example 3: Display the full routing table
console.log('Example 3: Display the full routing table');
console.log('-'.repeat(60));
console.log(getRoutingTable());

// Example 4: List all available signal types
console.log('Example 4: List all available signal types');
console.log('-'.repeat(60));
const signalTypes = getAvailableSignalTypes();
console.log('Available Signal Types:', signalTypes.length);
signalTypes.forEach((type, index) => {
    console.log(`  ${index + 1}. ${type}`);
});
console.log();

// Example 5: List all available engines
console.log('Example 5: List all available engines');
console.log('-'.repeat(60));
const engines = getAvailableEngines();
console.log('Available Engines:', engines.length);
engines.forEach((engine, index) => {
    console.log(`  ${index + 1}. ${engine}`);
});
console.log();

// Example 6: Get detailed information about a specific engine
console.log('Example 6: Get detailed engine information');
console.log('-'.repeat(60));
const bayesianEngine = getEngineDetails('Bayesian_Truth_Engine');
console.log('Engine:', bayesianEngine.name);
console.log('Description:', bayesianEngine.description);
console.log('Capabilities:');
bayesianEngine.capabilities.forEach(cap => {
    console.log(`  - ${cap}`);
});
console.log('Frameworks:', bayesianEngine.frameworks.join(', '));
console.log();

// Example 7: Execute the master prompt
console.log('Example 7: Execute the master prompt');
console.log('-'.repeat(60));
const masterExecution = executeMasterPrompt('Events');
console.log('Master Prompt:', masterExecution.masterPrompt);
console.log('Execution Steps:');
console.log('  Step 1 - Route:', masterExecution.execution.step1_route);
console.log('  Step 2 - Execute:', masterExecution.execution.step2_execute);
console.log('  Step 3 - Synthesize:', masterExecution.execution.step3_synthesize);
console.log();

// Example 8: Get system metadata
console.log('Example 8: Get system metadata');
console.log('-'.repeat(60));
const metadata = getSystemMetadata();
console.log('Architecture:', metadata.architecture);
console.log('Design Process:', metadata.design_process);
console.log('Year:', metadata.year);
console.log('Methodologies:', metadata.methodologies.join(', '));
console.log('Capabilities:', metadata.capabilities.join(', '));
console.log('Techniques:', metadata.techniques.join(', '));
console.log();

// Example 9: Real-world use case - Legal document processing
console.log('Example 9: Real-world use case - Legal document processing');
console.log('-'.repeat(60));
console.log('Scenario: Processing a legal contract with multiple components');
console.log();

const legalSignals = ['Contracts', 'Tone_Analyzer', 'Policies'];
const legalRouting = batchRouteSignals(legalSignals);

console.log('Processing pipeline:');
legalRouting.forEach((result, index) => {
    console.log(`\nStep ${index + 1}: ${result.signalType}`);
    console.log(`  Engine: ${result.engine}`);
    console.log(`  Purpose: ${result.description}`);
    console.log(`  Capabilities: ${result.capabilities.join(', ')}`);
});
console.log();

// Example 10: Real-world use case - Data analytics pipeline
console.log('Example 10: Real-world use case - Data analytics pipeline');
console.log('-'.repeat(60));
console.log('Scenario: Comprehensive data analysis workflow');
console.log();

const analyticsSignals = ['Tommy_Vectors', 'Numeric_Anomalies', 'TCO_Reporting'];
const analyticsRouting = batchRouteSignals(analyticsSignals);

console.log('Analytics Pipeline:');
analyticsRouting.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.signalType} Analysis`);
    console.log(`   Engine: ${result.engine}`);
    console.log(`   Focus: ${result.description}`);
    console.log(`   Frameworks: ${result.frameworks.join(', ')}`);
});
console.log();

console.log('='.repeat(60));
console.log('Examples completed successfully!');
console.log('='.repeat(60));
