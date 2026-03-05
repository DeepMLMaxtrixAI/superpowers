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
    executeMasterPrompt,
    getAgents,
    getAgentDetails,
    executeAgentPrompt
} from '../../skills/signal-routing/signal-router.js';

console.log('Starting Signal Router Tests...\n');

// Shared agent configuration used across multiple tests
const agentConfig = [
    { agent: 'KPI_Robot', trait: 'excited', engine: 'Code_Updater', signal: 'KPI_Robot' },
    { agent: 'Auto_Owl', trait: 'curious', engine: 'Audit_Watcher', signal: 'Auto_Owl' },
    { agent: 'Brians_Bee', trait: 'proud', engine: 'Hive_Syncer', signal: 'Brians_Bee' },
    { agent: 'Kid_Wendy', trait: 'amazed', engine: 'App_Coordinator', signal: 'Kid_Wendy' },
    { agent: 'Lakers_Dragon', trait: 'protective', engine: 'Security_Guardian', signal: 'Lakers_Dragon' }
];

// Test 1: Load configuration
console.log('Test 1: Load signal-engine mapping configuration');
try {
    const config = loadSignalEngineMapping();
    assert(config.version === '1.1.0', 'Config version should be 1.1.0');
    assert(config.mappings, 'Config should have mappings');
    assert(config.engines, 'Config should have engines');
    assert(config.agents, 'Config should have agents');
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
    { signal: 'Policies', expectedEngine: 'Compliance_Mapper' },
    ...agentConfig.map(({ signal, engine }) => ({ signal, expectedEngine: engine }))
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
    assert(signalTypes.length === 13, 'Should have 13 signal types');
    assert(signalTypes.includes('Tommy_Vectors'), 'Should include Tommy_Vectors');
    assert(signalTypes.includes('Policies'), 'Should include Policies');
    assert(signalTypes.includes('KPI_Robot'), 'Should include KPI_Robot');
    assert(signalTypes.includes('Auto_Owl'), 'Should include Auto_Owl');
    assert(signalTypes.includes('Brians_Bee'), 'Should include Brians_Bee');
    assert(signalTypes.includes('Kid_Wendy'), 'Should include Kid_Wendy');
    assert(signalTypes.includes('Lakers_Dragon'), 'Should include Lakers_Dragon');
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
    assert(engines.length === 13, 'Should have 13 engines');
    assert(engines.includes('Behavior_Forecasting'), 'Should include Behavior_Forecasting');
    assert(engines.includes('Compliance_Mapper'), 'Should include Compliance_Mapper');
    assert(engines.includes('Code_Updater'), 'Should include Code_Updater');
    assert(engines.includes('Audit_Watcher'), 'Should include Audit_Watcher');
    assert(engines.includes('Hive_Syncer'), 'Should include Hive_Syncer');
    assert(engines.includes('App_Coordinator'), 'Should include App_Coordinator');
    assert(engines.includes('Security_Guardian'), 'Should include Security_Guardian');
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

// Test 12: Get all agents
console.log('Test 12: Get all agent personas');
try {
    const agents = getAgents();
    assert(typeof agents === 'object', 'Should return an object');
    assert(agents.KPI_Robot, 'Should include KPI_Robot');
    assert(agents.Auto_Owl, 'Should include Auto_Owl');
    assert(agents.Brians_Bee, 'Should include Brians_Bee');
    assert(agents.Kid_Wendy, 'Should include Kid_Wendy');
    assert(agents.Lakers_Dragon, 'Should include Lakers_Dragon');
    console.log(`✓ Found ${Object.keys(agents).length} agents: ${Object.keys(agents).join(', ')}\n`);
} catch (error) {
    console.error('✗ Get agents failed:', error.message);
    process.exit(1);
}

// Test 13: Get individual agent details
console.log('Test 13: Get individual agent details');
try {
    agentConfig.forEach(({ agent, trait, engine }) => {
        const details = getAgentDetails(agent);
        assert(details.name === agent, `${agent} should have correct name`);
        assert(details.trait === trait, `${agent} should have trait '${trait}', got '${details.trait}'`);
        assert(details.engine === engine, `${agent} should use engine '${engine}', got '${details.engine}'`);
        assert(details.behavior, `${agent} should have a behavior description`);
        console.log(`✓ ${agent} (${trait}) → ${engine}`);
    });
    console.log('✓ All agent details retrieved correctly\n');
} catch (error) {
    console.error('✗ Get agent details failed:', error.message);
    process.exit(1);
}

// Test 14: Execute agent prompt with SWOT-AI-REFINE-OODA
console.log('Test 14: Execute agent prompt (SWOT-AI-REFINE-OODA)');
try {
    const execution = executeAgentPrompt('Lakers_Dragon');
    assert(execution.agentPrompt, 'Should have agent prompt');
    assert(execution.agent === 'Lakers_Dragon', 'Should reference correct agent');
    assert(execution.trait === 'protective', 'Should have protective trait');
    assert(execution.behavior === 'guards security logs', 'Should have correct behavior');
    assert(execution.execution, 'Should have execution details');
    assert(execution.execution.step1_observe, 'Should have observe step');
    assert(execution.execution.step2_orient === 'SWOT_Analysis', 'Should orient with SWOT');
    assert(execution.execution.step3_decide === 'REFINE_Loop', 'Should decide with REFINE');
    assert(execution.execution.step4_act, 'Should have OODA act step');
    assert(execution.execution.step5_unlock === 'Intrinsic_Value', 'Should unlock intrinsic value');
    assert(execution.execution.safety === 'AI_SAFE', 'Should be AI_SAFE');
    console.log(`✓ Agent prompt executed: ${execution.agentPrompt}\n`);
} catch (error) {
    console.error('✗ Agent prompt execution failed:', error.message);
    process.exit(1);
}

// Test 15: Invalid agent handling
console.log('Test 15: Handle invalid agent name');
try {
    let threw = false;
    try {
        getAgentDetails('Unknown_Agent');
    } catch (e) {
        threw = true;
        assert(e.message.includes('Unknown agent'), 'Error should mention unknown agent');
    }
    assert(threw, 'Should throw for unknown agent');
    console.log('✓ Invalid agent handled correctly\n');
} catch (error) {
    console.error('✗ Invalid agent handling failed:', error.message);
    process.exit(1);
}

// Test 16: Agent signals route correctly through signal router
console.log('Test 16: Agent signals route through signal router');
try {
    const kpiResult = routeSignal('KPI_Robot');
    assert(kpiResult.engine === 'Code_Updater', 'KPI_Robot should route to Code_Updater');
    assert(kpiResult.trait === 'excited', 'Code_Updater should carry excited trait');

    const dragonResult = routeSignal('Lakers_Dragon');
    assert(dragonResult.engine === 'Security_Guardian', 'Lakers_Dragon should route to Security_Guardian');
    assert(dragonResult.trait === 'protective', 'Security_Guardian should carry protective trait');
    console.log('✓ Agent signals routed correctly through signal router\n');
} catch (error) {
    console.error('✗ Agent signal routing failed:', error.message);
    process.exit(1);
}

// Test 17: Metadata includes new methodology
console.log('Test 17: Metadata includes SWOT-AI-REFINE-OODA methodology');
try {
    const metadata = getSystemMetadata();
    assert(metadata.methodologies.includes('SWOT-AI-REFINE-OODA'),
        'Metadata should include SWOT-AI-REFINE-OODA');
    assert(metadata.safety === 'AI_SAFE', 'Metadata should declare AI_SAFE');
    assert(metadata.agent_prompt, 'Metadata should have agent prompt');
    assert(metadata.capabilities.includes('INTRINSIC_VALUE'),
        'Metadata capabilities should include INTRINSIC_VALUE');
    console.log('✓ Metadata includes SWOT-AI-REFINE-OODA and AI_SAFE\n');
} catch (error) {
    console.error('✗ Metadata check failed:', error.message);
    process.exit(1);
}

console.log('='.repeat(50));
console.log('✓ All tests passed successfully!');
console.log('='.repeat(50));
