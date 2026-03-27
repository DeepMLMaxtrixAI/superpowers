/**
 * Tests for Deep-Think Input Processing Pipeline
 *
 * Validates all 5 pipeline stages, NAND logic gates, safety guardrails,
 * and the full end-to-end pipeline execution.
 */

import { strict as assert } from 'assert';
import {
    loadPipelineConfig,
    nandGate,
    applyMatrixNandGate,
    vectorClassification,
    noiseFiltering,
    domainAnalysis,
    constraintChecking,
    decisionBlueprint,
    runDeepThinkPipeline,
    getPipelineMetadata,
    getPipelineStages,
    getStageDetails,
    getSafetyGuardrails,
    getLogicComponents
} from '../../skills/deep-think/deep-think-processor.js';

console.log('Starting Deep-Think Pipeline Tests...\n');

// Test 1: Load pipeline configuration
console.log('Test 1: Load pipeline configuration');
try {
    const config = loadPipelineConfig();
    assert(config.version === '1.0.0', 'Config version should be 1.0.0');
    assert(config.pipeline, 'Config should have pipeline definition');
    assert(config.stages, 'Config should have stages');
    assert(config.safety_guardrails, 'Config should have safety_guardrails');
    assert(config.logic_components, 'Config should have logic_components');
    assert(config.metadata, 'Config should have metadata');
    console.log('✓ Pipeline configuration loaded successfully\n');
} catch (error) {
    console.error('✗ Configuration loading failed:', error.message);
    process.exit(1);
}

// Test 2: Pipeline stages are defined in correct order
console.log('Test 2: Pipeline stages defined in correct order');
try {
    const stages = getPipelineStages();
    const expected = [
        'Vector_Classification',
        'Noise_Filtering',
        'Domain_Analysis',
        'Constraint_Checking',
        'Decision_Blueprint'
    ];
    assert(Array.isArray(stages), 'Should return an array');
    assert(stages.length === 5, 'Should have 5 stages');
    expected.forEach((name, index) => {
        assert(stages[index] === name, `Stage ${index + 1} should be ${name}, got ${stages[index]}`);
    });
    console.log(`✓ Stages in order: ${stages.join(' → ')}\n`);
} catch (error) {
    console.error('✗ Pipeline stage order check failed:', error.message);
    process.exit(1);
}

// Test 3: NAND gate truth table
console.log('Test 3: NAND gate Boolean truth table');
try {
    assert(nandGate(false, false) === true,  'NAND(0,0) should be 1');
    assert(nandGate(false, true)  === true,  'NAND(0,1) should be 1');
    assert(nandGate(true,  false) === true,  'NAND(1,0) should be 1');
    assert(nandGate(true,  true)  === false, 'NAND(1,1) should be 0');
    console.log('✓ NAND gate truth table verified\n');
} catch (error) {
    console.error('✗ NAND gate test failed:', error.message);
    process.exit(1);
}

// Test 4: Mathematical-Matrix-NAND-Gate application
console.log('Test 4: Mathematical-Matrix-New-X-NAND-Gates');
try {
    const { classified, raw } = applyMatrixNandGate([0.8, 0.2, 0.9, 0.1], 0.5);
    assert(Array.isArray(classified), 'classified should be an array');
    assert(classified.length === 4, 'classified should have 4 elements');
    assert(raw.length === 4, 'raw should preserve 4 elements');
    // Values >= 0.5 → nandGate(true, true) = false (grounded signal)
    // Values <  0.5 → nandGate(false, true) = true (noise)
    assert(classified[0] === false, '0.8 >= 0.5 → NAND(1,1) = 0 (grounded)');
    assert(classified[1] === true,  '0.2 <  0.5 → NAND(0,1) = 1 (noise)');
    assert(classified[2] === false, '0.9 >= 0.5 → NAND(1,1) = 0 (grounded)');
    assert(classified[3] === true,  '0.1 <  0.5 → NAND(0,1) = 1 (noise)');
    console.log('✓ Matrix NAND gate applied correctly\n');
} catch (error) {
    console.error('✗ Matrix NAND gate test failed:', error.message);
    process.exit(1);
}

// Test 5: Stage 1 — Vector Classification
console.log('Test 5: Stage 1 — Vector Classification');
try {
    const result = vectorClassification({ values: [0.8, 0.2, 0.9] });
    assert(result.stage === 'Vector_Classification', 'Stage name should be Vector_Classification');
    assert(Array.isArray(result.input), 'Should include input');
    assert(Array.isArray(result.classified), 'Should include classified vector');
    assert(result.classified.length === 3, 'Classified vector length should match input');
    assert(Array.isArray(result.capabilities), 'Should include capabilities');
    assert(result.capabilities.includes('nand_gate_filtering'), 'Should include nand_gate_filtering capability');
    assert(Array.isArray(result.safety), 'Should include safety guardrails');
    assert(result.safety.includes('data_boundary_enforcement'), 'Should include data_boundary_enforcement');
    assert(result.safety.includes('context_isolation'), 'Should include context_isolation');
    assert(result.processedAt, 'Should include processedAt timestamp');
    console.log('✓ Vector Classification stage completed correctly\n');
} catch (error) {
    console.error('✗ Vector Classification stage failed:', error.message);
    process.exit(1);
}

// Test 6: Stage 2 — Noise Filtering
console.log('Test 6: Stage 2 — Noise Filtering');
try {
    const stage1 = vectorClassification({ values: [0.8, 0.2, 0.9, 0.1] });
    const result = noiseFiltering(stage1);
    assert(result.stage === 'Noise_Filtering', 'Stage name should be Noise_Filtering');
    assert(Array.isArray(result.input), 'Should include input');
    assert(Array.isArray(result.filtered), 'Should include filtered array');
    assert(typeof result.adversarialDetected === 'boolean', 'Should report adversarialDetected');
    assert(typeof result.groundingVerified === 'boolean', 'Should report groundingVerified');
    assert(result.safety.includes('adversarial_network_triggers'), 'Should include adversarial_network_triggers');
    assert(result.safety.includes('grounding_verification_gates'), 'Should include grounding_verification_gates');
    // With values [0.8, 0.2, 0.9, 0.1]: classified = [false, true, false, true]
    // filtered retains only false values (grounded): count = 2
    assert(result.filtered.length === 2, 'Should retain 2 grounded (false) signals');
    assert(result.adversarialDetected === true, 'Should detect adversarial (noise) signals');
    assert(result.groundingVerified === false, 'Grounding should not be verified when adversarial detected');
    console.log('✓ Noise Filtering stage completed correctly\n');
} catch (error) {
    console.error('✗ Noise Filtering stage failed:', error.message);
    process.exit(1);
}

// Test 7: Stage 2 — Noise Filtering with all clean signals
console.log('Test 7: Noise Filtering with all clean (grounded) signals');
try {
    const stage1 = vectorClassification({ values: [0.9, 0.8, 0.7] });
    const result = noiseFiltering(stage1);
    // All values >= 0.5 → classified = [false, false, false] → no adversarial
    assert(result.adversarialDetected === false, 'Should not detect adversarial in clean signals');
    assert(result.groundingVerified === true, 'Should verify grounding for clean signals');
    assert(result.filtered.length === 3, 'All 3 grounded signals should pass through');
    console.log('✓ Noise Filtering with clean signals completed correctly\n');
} catch (error) {
    console.error('✗ Noise Filtering clean signal test failed:', error.message);
    process.exit(1);
}

// Test 8: Stage 3 — Domain Analysis
console.log('Test 8: Stage 3 — Domain Analysis');
try {
    const stage1 = vectorClassification({ values: [0.9, 0.8, 0.7] });
    const stage2 = noiseFiltering(stage1);
    const result = domainAnalysis(stage2, 'finance');
    assert(result.stage === 'Domain_Analysis', 'Stage name should be Domain_Analysis');
    assert(result.domain === 'finance', 'Domain should be finance');
    assert(typeof result.signalStrength === 'number', 'Should report signalStrength');
    assert(typeof result.hallucinationProbability === 'number', 'Should report hallucinationProbability');
    assert(typeof result.hallucinationAlert === 'boolean', 'Should report hallucinationAlert');
    assert(result.semanticContext === 'finance_context', 'Should set correct semantic context');
    assert(result.safety.includes('hallucination_probability_alerts'), 'Should include hallucination_probability_alerts');
    assert(result.safety.includes('memory_write_protection'), 'Should include memory_write_protection');
    // Signal strength = 3 (3 filtered values) → hallucinationProbability = max(0, 1 - 3/10) = 0.7
    assert(result.hallucinationProbability === 0.7, `Hallucination probability should be 0.7, got ${result.hallucinationProbability}`);
    assert(result.hallucinationAlert === true, 'Should alert when hallucination probability > 0.5');
    console.log('✓ Domain Analysis stage completed correctly\n');
} catch (error) {
    console.error('✗ Domain Analysis stage failed:', error.message);
    process.exit(1);
}

// Test 9: Stage 3 — Domain Analysis with no hallucination
console.log('Test 9: Domain Analysis with strong signal (no hallucination)');
try {
    // Create a filtered output with 6+ signals to get hallucination probability <= 0.5
    const fakeFilteredOutput = { filtered: [false, false, false, false, false, false] };
    const result = domainAnalysis(fakeFilteredOutput, 'legal');
    assert(result.hallucinationProbability <= 0.5, 'Should have low hallucination probability');
    assert(result.hallucinationAlert === false, 'Should not alert when probability is low');
    console.log('✓ Domain Analysis no-hallucination case verified\n');
} catch (error) {
    console.error('✗ Domain Analysis no-hallucination test failed:', error.message);
    process.exit(1);
}

// Test 10: Stage 4 — Constraint Checking
console.log('Test 10: Stage 4 — Constraint Checking with NAND logic');
try {
    const fakeDomainOutput = {
        hallucinationAlert: false,
        signalStrength: 5,
        hallucinationProbability: 0.5
    };
    const constraints = { data_quality: true, policy_compliant: true, risk_within_bounds: false };
    const result = constraintChecking(fakeDomainOutput, constraints);
    assert(result.stage === 'Constraint_Checking', 'Stage name should be Constraint_Checking');
    assert(typeof result.constraintResults === 'object', 'Should include constraintResults');
    assert(typeof result.confidenceScore === 'number', 'Should include confidenceScore');
    assert(result.totalConstraints === 3, 'Should have 3 constraints');
    assert(result.accountabilityAnchor, 'Should include accountabilityAnchor');
    assert(result.safety.includes('decision_accountability_anchors'), 'Should include decision_accountability_anchors');
    assert(result.safety.includes('confidence_calibration_checks'), 'Should include confidence_calibration_checks');
    assert(result.safety.includes('session_firewalling'), 'Should include session_firewalling');
    // NAND(true, false) = true → data_quality passes
    assert(result.constraintResults.data_quality === true, 'data_quality should pass (NAND(true,false)=true)');
    // NAND(false, false) = true → risk_within_bounds passes
    assert(result.constraintResults.risk_within_bounds === true, 'risk_within_bounds should pass (NAND(false,false)=true)');
    console.log('✓ Constraint Checking stage completed correctly\n');
} catch (error) {
    console.error('✗ Constraint Checking stage failed:', error.message);
    process.exit(1);
}

// Test 11: Stage 5 — Decision Blueprint (approved)
console.log('Test 11: Stage 5 — Decision Blueprint (approved path)');
try {
    const fakeConstraintOutput = {
        confidenceScore: 0.8,
        accountabilityAnchor: 'test_anchor_123',
        constraintResults: { data_quality: true }
    };
    const fakeDomainOutput = {
        hallucinationAlert: false,
        domain: 'general',
        signalStrength: 5,
        hallucinationProbability: 0.5
    };
    const result = decisionBlueprint(fakeConstraintOutput, fakeDomainOutput);
    assert(result.stage === 'Decision_Blueprint', 'Stage name should be Decision_Blueprint');
    assert(result.decision === 'APPROVED', 'High confidence + no hallucination should be APPROVED');
    assert(result.confidenceScore === 0.8, 'Should preserve confidence score');
    assert(result.explainabilityCheckpoint, 'Should include explainabilityCheckpoint');
    assert(result.explainabilityCheckpoint.blueprintGenerated === true, 'Blueprint should be marked generated');
    assert(result.modelSelfDiagnostics, 'Should include modelSelfDiagnostics');
    assert(result.accountabilityAnchor === 'test_anchor_123', 'Should preserve accountability anchor');
    assert(result.safety === 'AI_SAFE', 'Should be AI_SAFE');
    assert(result.masterPrompt, 'Should include master prompt');
    console.log('✓ Decision Blueprint (APPROVED) generated correctly\n');
} catch (error) {
    console.error('✗ Decision Blueprint (approved) test failed:', error.message);
    process.exit(1);
}

// Test 12: Stage 5 — Decision Blueprint (flagged path)
console.log('Test 12: Stage 5 — Decision Blueprint (flagged path)');
try {
    const fakeConstraintOutput = {
        confidenceScore: 0.3,
        accountabilityAnchor: 'test_anchor_456',
        constraintResults: {}
    };
    const fakeDomainOutput = {
        hallucinationAlert: true,
        domain: 'general',
        signalStrength: 1,
        hallucinationProbability: 0.9
    };
    const result = decisionBlueprint(fakeConstraintOutput, fakeDomainOutput);
    assert(result.decision === 'FLAGGED', 'Low confidence + hallucination should be FLAGGED');
    assert(result.hallucinationAlert === true, 'Should propagate hallucination alert');
    console.log('✓ Decision Blueprint (FLAGGED) generated correctly\n');
} catch (error) {
    console.error('✗ Decision Blueprint (flagged) test failed:', error.message);
    process.exit(1);
}

// Test 13: Full end-to-end pipeline
console.log('Test 13: Full end-to-end Deep-Think pipeline');
try {
    const result = runDeepThinkPipeline(
        { values: [0.9, 0.85, 0.8, 0.75, 0.7, 0.65], domain: 'healthcare' },
        { safety_check: true, compliance_ok: true }
    );
    assert(result.pipeline === 'Deep_Think', 'Pipeline name should be Deep_Think');
    assert(result.stages, 'Should include all stages');
    assert(result.stages.Vector_Classification, 'Should include Vector_Classification stage');
    assert(result.stages.Noise_Filtering, 'Should include Noise_Filtering stage');
    assert(result.stages.Domain_Analysis, 'Should include Domain_Analysis stage');
    assert(result.stages.Constraint_Checking, 'Should include Constraint_Checking stage');
    assert(result.stages.Decision_Blueprint, 'Should include Decision_Blueprint stage');
    assert(result.blueprint, 'Should include final blueprint');
    assert(['APPROVED', 'FLAGGED'].includes(result.blueprint.decision), 'Blueprint should have a valid decision');
    assert(result.completedAt, 'Should include completedAt timestamp');
    console.log(`✓ Full pipeline completed: decision = ${result.blueprint.decision}\n`);
} catch (error) {
    console.error('✗ Full pipeline test failed:', error.message);
    process.exit(1);
}

// Test 14: Get pipeline metadata
console.log('Test 14: Pipeline metadata');
try {
    const metadata = getPipelineMetadata();
    assert(metadata.safety === 'AI_SAFE', 'Should declare AI_SAFE');
    assert(metadata.year === '2026', 'Should be for year 2026');
    assert(metadata.master_prompt, 'Should have master prompt');
    assert(metadata.master_prompt.includes('Decision_Blueprint') || metadata.master_prompt.includes('Blueprint'),
        'Master prompt should reference Decision Blueprint');
    assert(Array.isArray(metadata.methodologies), 'Should have methodologies array');
    assert(metadata.methodologies.includes('NAND_Boolean_Logic'), 'Should include NAND_Boolean_Logic');
    assert(metadata.methodologies.includes('DEEP_THINK'), 'Should include DEEP_THINK');
    assert(Array.isArray(metadata.capabilities), 'Should have capabilities array');
    assert(metadata.capabilities.includes('SCARCITY_EXTRACTION'), 'Should include SCARCITY_EXTRACTION');
    assert(metadata.capabilities.includes('LLM_COMPLEXITY_EXPLORATION'), 'Should include LLM_COMPLEXITY_EXPLORATION');
    assert(metadata.capabilities.includes('TEACHER_YIELDED'), 'Should include TEACHER_YIELDED');
    assert(metadata.capabilities.includes('DEEP_THINK'), 'Should include DEEP_THINK');
    console.log('✓ Pipeline metadata verified\n');
} catch (error) {
    console.error('✗ Pipeline metadata test failed:', error.message);
    process.exit(1);
}

// Test 15: Get stage details
console.log('Test 15: Get stage details for each pipeline stage');
try {
    const stages = getPipelineStages();
    stages.forEach(stageName => {
        const details = getStageDetails(stageName);
        assert(details.name === stageName, `Stage name should be ${stageName}`);
        assert(details.description, `${stageName} should have a description`);
        assert(Array.isArray(details.capabilities), `${stageName} should have capabilities`);
        assert(Array.isArray(details.safety), `${stageName} should have safety guardrails`);
        assert(Array.isArray(details.frameworks), `${stageName} should have frameworks`);
        console.log(`✓ ${stageName}: ${details.capabilities.length} capabilities, ${details.safety.length} safety guardrails`);
    });
    console.log('✓ All stage details retrieved correctly\n');
} catch (error) {
    console.error('✗ Stage details test failed:', error.message);
    process.exit(1);
}

// Test 16: Invalid stage name throws
console.log('Test 16: Invalid stage name throws error');
try {
    let threw = false;
    try {
        getStageDetails('Unknown_Stage');
    } catch (e) {
        threw = true;
        assert(e.message.includes('Unknown stage'), 'Error should mention unknown stage');
    }
    assert(threw, 'Should throw for unknown stage name');
    console.log('✓ Invalid stage name handled correctly\n');
} catch (error) {
    console.error('✗ Invalid stage error handling failed:', error.message);
    process.exit(1);
}

// Test 17: Safety guardrails — all 12 present
console.log('Test 17: All 12 safety guardrails are defined');
try {
    const guardrails = getSafetyGuardrails();
    const required = [
        'data_integrity_review',
        'explainability_checkpoints',
        'decision_accountability_anchors',
        'model_self_diagnostics',
        'confidence_calibration_checks',
        'hallucination_probability_alerts',
        'grounding_verification_gates',
        'data_boundary_enforcement',
        'memory_write_protection',
        'context_isolation',
        'session_firewalling',
        'adversarial_network_triggers'
    ];
    required.forEach(name => {
        assert(guardrails[name], `Safety guardrail '${name}' should be defined`);
        assert(typeof guardrails[name] === 'string', `Guardrail '${name}' should have a string description`);
        console.log(`✓ ${name}`);
    });
    assert(Object.keys(guardrails).length === 12, `Should have exactly 12 guardrails, got ${Object.keys(guardrails).length}`);
    console.log('✓ All 12 safety guardrails verified\n');
} catch (error) {
    console.error('✗ Safety guardrails test failed:', error.message);
    process.exit(1);
}

// Test 18: Logic components — NAND and Matrix gates
console.log('Test 18: Logic components — NAND Boolean logic and Matrix NAND gates');
try {
    const logic = getLogicComponents();
    assert(logic.NAND_Boolean_Logic, 'Should define NAND_Boolean_Logic');
    assert(logic.Mathematical_Matrix_New_X_NAND_Gates, 'Should define Mathematical_Matrix_New_X_NAND_Gates');

    const nandLogic = logic.NAND_Boolean_Logic;
    assert(Array.isArray(nandLogic.operations), 'NAND logic should have operations');
    assert(nandLogic.operations.includes('NAND'), 'Should include NAND operation');
    assert(nandLogic.truth_table, 'Should include truth table');
    assert(nandLogic.truth_table['NAND(1,1)'] === 0, 'NAND(1,1) should be 0');
    assert(nandLogic.truth_table['NAND(0,0)'] === 1, 'NAND(0,0) should be 1');

    const matrixGate = logic.Mathematical_Matrix_New_X_NAND_Gates;
    assert(Array.isArray(matrixGate.operations), 'Matrix gate should have operations');
    assert(matrixGate.operations.includes('nand_gate_apply'), 'Should include nand_gate_apply');
    assert(matrixGate.operations.includes('logical_gap_analysis'), 'Should include logical_gap_analysis');
    console.log('✓ Logic components verified\n');
} catch (error) {
    console.error('✗ Logic components test failed:', error.message);
    process.exit(1);
}

// Test 19: Pipeline with empty values (edge case)
console.log('Test 19: Pipeline edge case — empty input values');
try {
    const result = runDeepThinkPipeline({ values: [], domain: 'test' }, {});
    assert(result.pipeline === 'Deep_Think', 'Pipeline should still complete');
    assert(result.blueprint.decision === 'FLAGGED', 'Empty input should result in FLAGGED decision');
    // With no values, hallucinationProbability = 1.0 → alert fires → FLAGGED
    assert(result.stages.Domain_Analysis.hallucinationAlert === true, 'Should raise hallucination alert for empty input');
    console.log('✓ Empty input handled correctly (FLAGGED as expected)\n');
} catch (error) {
    console.error('✗ Empty input edge case failed:', error.message);
    process.exit(1);
}

console.log('='.repeat(55));
console.log('✓ All Deep-Think pipeline tests passed successfully!');
console.log('='.repeat(55));
