/**
 * Tests for Brand Architecture Engine
 *
 * Validates the six-layer Brand Stack framework, master formula,
 * equity formula, decision loop, and audit utilities.
 */

import { strict as assert } from 'assert';
import {
    loadBrandArchitecture,
    getLayerOrder,
    getLayerDetails,
    isValidArchetype,
    getArchetypes,
    applyMasterFormula,
    applyEquityFormula,
    executeDecisionLoop,
    getCulturalStoryLoop,
    getKeyPrinciples,
    auditBrandStack
} from '../../skills/brand-architecture/brand-engine.js';

console.log('Starting Brand Architecture Engine Tests...\n');

// Test 1: Load configuration
console.log('Test 1: Load brand-architecture configuration');
try {
    const config = loadBrandArchitecture();
    assert(config.version === '1.0.0', 'Config version should be 1.0.0');
    assert(config.layers, 'Config should have layers');
    assert(config.master_formula, 'Config should have master_formula');
    assert(config.equity_formula, 'Config should have equity_formula');
    assert(config.decision_loop, 'Config should have decision_loop');
    assert(config.key_principles, 'Config should have key_principles');
    console.log('✓ Configuration loaded successfully\n');
} catch (error) {
    console.error('✗ Configuration loading failed:', error.message);
    process.exit(1);
}

// Test 2: Layer order — bottom to top
console.log('Test 2: Layers are returned in correct bottom-to-top order');
try {
    const order = getLayerOrder();
    assert(Array.isArray(order), 'Should return an array');
    assert(order.length === 6, 'Should have 6 layers');
    assert(order[0] === 'BRAND_CORE', 'First layer should be BRAND_CORE');
    assert(order[5] === 'CULTURAL_AMPLIFICATION', 'Last layer should be CULTURAL_AMPLIFICATION');
    const expectedOrder = [
        'BRAND_CORE',
        'ARCHETYPE_IDENTITY',
        'NARRATIVE_ENGINE',
        'PRODUCT_ECOSYSTEM',
        'TRUST_INFRASTRUCTURE',
        'CULTURAL_AMPLIFICATION'
    ];
    assert.deepEqual(order, expectedOrder, 'Layer order should match hierarchy');
    console.log(`✓ Layer order: ${order.join(' → ')}\n`);
} catch (error) {
    console.error('✗ Layer order test failed:', error.message);
    process.exit(1);
}

// Test 3: Get individual layer details
console.log('Test 3: Get individual layer details');
try {
    const brandCore = getLayerDetails('BRAND_CORE');
    assert(brandCore.name === 'BRAND_CORE', 'Should have correct name');
    assert(brandCore.level === 1, 'BRAND_CORE should be level 1');
    assert(brandCore.description, 'Should have description');
    assert(brandCore.output === 'positioning_sentence', 'Output should be positioning_sentence');

    const cultural = getLayerDetails('CULTURAL_AMPLIFICATION');
    assert(cultural.name === 'CULTURAL_AMPLIFICATION', 'Should have correct name');
    assert(cultural.level === 6, 'CULTURAL_AMPLIFICATION should be level 6');
    assert(cultural.mechanisms, 'Should have mechanisms');

    const narrative = getLayerDetails('NARRATIVE_ENGINE');
    assert(narrative.level === 3, 'NARRATIVE_ENGINE should be level 3');
    assert(Array.isArray(narrative.cultural_story_loop), 'Should have cultural_story_loop array');
    assert(narrative.cultural_story_loop.length === 5, 'Story loop should have 5 steps');

    console.log('✓ Layer details retrieved correctly\n');
} catch (error) {
    console.error('✗ Layer details test failed:', error.message);
    process.exit(1);
}

// Test 4: Unknown layer throws
console.log('Test 4: Unknown layer name throws an error');
try {
    let threw = false;
    try {
        getLayerDetails('UNKNOWN_LAYER');
    } catch (e) {
        threw = true;
        assert(e.message.includes('Unknown brand layer'), 'Error should mention unknown layer');
    }
    assert(threw, 'Should throw for unknown layer');
    console.log('✓ Unknown layer handled correctly\n');
} catch (error) {
    console.error('✗ Unknown layer test failed:', error.message);
    process.exit(1);
}

// Test 5: Archetype validation
console.log('Test 5: Archetype validation');
try {
    assert(isValidArchetype('Hero') === true, 'Hero should be valid');
    assert(isValidArchetype('Sage') === true, 'Sage should be valid');
    assert(isValidArchetype('Rebel') === true, 'Rebel should be valid');
    assert(isValidArchetype('Magician') === true, 'Magician should be valid');
    assert(isValidArchetype('UnknownArchetype') === false, 'Unknown archetype should be invalid');
    assert(isValidArchetype('') === false, 'Empty string should be invalid');
    console.log('✓ Archetype validation works correctly\n');
} catch (error) {
    console.error('✗ Archetype validation test failed:', error.message);
    process.exit(1);
}

// Test 6: Get all archetypes
console.log('Test 6: Get all canonical archetypes');
try {
    const archetypes = getArchetypes();
    assert(Array.isArray(archetypes), 'Should return an array');
    assert(archetypes.length === 12, 'Should have 12 archetypes');
    assert(archetypes.includes('Hero'), 'Should include Hero');
    assert(archetypes.includes('Everyman'), 'Should include Everyman');
    assert(archetypes.includes('Magician'), 'Should include Magician');
    console.log(`✓ Found ${archetypes.length} archetypes: ${archetypes.join(', ')}\n`);
} catch (error) {
    console.error('✗ Get archetypes test failed:', error.message);
    process.exit(1);
}

// Test 7: Master formula — all inputs present → cultural dominance
console.log('Test 7: Master formula with all inputs → cultural_dominance');
try {
    const result = applyMasterFormula({
        clear_archetype: true,
        compelling_narrative: true,
        integrated_ecosystem: true
    });
    assert(result.achieved === true, 'Should achieve cultural dominance');
    assert(result.output === 'cultural_dominance', 'Output should be cultural_dominance');
    assert(result.gaps.length === 0, 'Should have no gaps');
    assert(result.evaluatedAt, 'Should include evaluation timestamp');
    console.log('✓ Master formula: cultural_dominance achieved\n');
} catch (error) {
    console.error('✗ Master formula (full) test failed:', error.message);
    process.exit(1);
}

// Test 8: Master formula — missing inputs → gaps reported
console.log('Test 8: Master formula with missing inputs → gaps reported');
try {
    const result = applyMasterFormula({
        clear_archetype: true,
        compelling_narrative: false,
        integrated_ecosystem: false
    });
    assert(result.achieved === false, 'Should not achieve cultural dominance');
    assert(result.output === null, 'Output should be null');
    assert(result.gaps.length === 2, 'Should report 2 gaps');
    assert(result.gaps.includes('compelling_narrative'), 'Should flag compelling_narrative gap');
    assert(result.gaps.includes('integrated_ecosystem'), 'Should flag integrated_ecosystem gap');
    console.log('✓ Master formula: gaps reported correctly\n');
} catch (error) {
    console.error('✗ Master formula (gaps) test failed:', error.message);
    process.exit(1);
}

// Test 9: Equity formula — all inputs present → multi-decade brand equity
console.log('Test 9: Equity formula with all inputs → multi_decade_brand_equity');
try {
    const result = applyEquityFormula({
        simple_name: true,
        strong_visual_symbol: true,
        authority_persona: true,
        cultural_story_loop: true
    });
    assert(result.achieved === true, 'Should achieve multi-decade brand equity');
    assert(result.output === 'multi_decade_brand_equity', 'Output should be multi_decade_brand_equity');
    assert(result.gaps.length === 0, 'Should have no gaps');
    assert(result.evaluatedAt, 'Should include evaluation timestamp');
    console.log('✓ Equity formula: multi_decade_brand_equity achieved\n');
} catch (error) {
    console.error('✗ Equity formula (full) test failed:', error.message);
    process.exit(1);
}

// Test 10: Equity formula — missing inputs → gaps reported
console.log('Test 10: Equity formula with missing inputs → gaps reported');
try {
    const result = applyEquityFormula({
        simple_name: false,
        strong_visual_symbol: true,
        authority_persona: false,
        cultural_story_loop: true
    });
    assert(result.achieved === false, 'Should not achieve brand equity');
    assert(result.output === null, 'Output should be null');
    assert(result.gaps.length === 2, 'Should report 2 gaps');
    assert(result.gaps.includes('simple_name'), 'Should flag simple_name gap');
    assert(result.gaps.includes('authority_persona'), 'Should flag authority_persona gap');
    console.log('✓ Equity formula: gaps reported correctly\n');
} catch (error) {
    console.error('✗ Equity formula (gaps) test failed:', error.message);
    process.exit(1);
}

// Test 11: Decision loop execution
console.log('Test 11: Execute SWOT-BRAND-REFINE decision loop');
try {
    const result = executeDecisionLoop('TRUST_INFRASTRUCTURE');
    assert(result.loop === 'SWOT-BRAND-REFINE', 'Should use SWOT-BRAND-REFINE loop');
    assert(result.prompt.includes('Observe'), 'Prompt should include Observe step');
    assert(result.targetLayer === 'TRUST_INFRASTRUCTURE', 'Should target correct layer');
    assert(Array.isArray(result.steps), 'Should include steps array');
    assert(result.steps.length === 5, 'Should have 5 loop steps');
    assert(result.executedAt, 'Should include execution timestamp');
    console.log(`✓ Decision loop: ${result.prompt}\n`);
} catch (error) {
    console.error('✗ Decision loop test failed:', error.message);
    process.exit(1);
}

// Test 12: Decision loop — unknown layer throws
console.log('Test 12: Decision loop with unknown layer throws');
try {
    let threw = false;
    try {
        executeDecisionLoop('FAKE_LAYER');
    } catch (e) {
        threw = true;
        assert(e.message.includes('Unknown brand layer'), 'Error should mention unknown layer');
    }
    assert(threw, 'Should throw for unknown layer');
    console.log('✓ Unknown layer in decision loop handled correctly\n');
} catch (error) {
    console.error('✗ Decision loop unknown layer test failed:', error.message);
    process.exit(1);
}

// Test 13: Cultural Story Loop
console.log('Test 13: Get Cultural Story Loop');
try {
    const loop = getCulturalStoryLoop();
    assert(Array.isArray(loop), 'Should return an array');
    assert(loop.length === 5, 'Story loop should have 5 steps');
    assert(loop[0].toLowerCase().includes('tension'), 'First step should be Tension');
    assert(loop[4].toLowerCase().includes('re-entry'), 'Last step should be Re-entry');
    console.log(`✓ Cultural Story Loop has ${loop.length} steps\n`);
} catch (error) {
    console.error('✗ Cultural Story Loop test failed:', error.message);
    process.exit(1);
}

// Test 14: Key principles
console.log('Test 14: Get key principles');
try {
    const principles = getKeyPrinciples();
    assert(Array.isArray(principles), 'Should return an array');
    assert(principles.length >= 4, 'Should have at least 4 principles');
    const joined = principles.join(' ');
    assert(joined.includes('Archetype'), 'Should include archetype principle');
    assert(joined.includes('Narrative'), 'Should include narrative principle');
    assert(joined.includes('Trust'), 'Should include trust principle');
    console.log(`✓ Found ${principles.length} key principles\n`);
} catch (error) {
    console.error('✗ Key principles test failed:', error.message);
    process.exit(1);
}

// Test 15: Full brand stack audit — complete brand
console.log('Test 15: Audit a fully complete brand');
try {
    const audit = auditBrandStack({
        name: 'Apex',
        archetype: 'Hero',
        hasNarrative: true,
        hasEcosystem: true,
        hasTrustInfrastructure: true,
        hasAmplificationMechanisms: true
    });
    assert(audit.brand === 'Apex', 'Should capture brand name');
    assert(audit.completedLayers === 6, 'Should have 6 completed layers');
    assert(audit.totalLayers === 6, 'Should have 6 total layers');
    assert(audit.completionPercentage === 100, 'Should be 100% complete');
    assert(audit.culturalDominanceReady === true, 'Should be ready for cultural dominance');
    assert(audit.recommendations.length === 0, 'Should have no recommendations');
    assert(audit.auditedAt, 'Should include audit timestamp');
    console.log('✓ Full brand audit: cultural dominance ready\n');
} catch (error) {
    console.error('✗ Full brand audit test failed:', error.message);
    process.exit(1);
}

// Test 16: Full brand stack audit — incomplete brand
console.log('Test 16: Audit an incomplete brand');
try {
    const audit = auditBrandStack({
        name: 'StartupX',
        archetype: 'Explorer',
        hasNarrative: false,
        hasEcosystem: false,
        hasTrustInfrastructure: false,
        hasAmplificationMechanisms: false
    });
    assert(audit.brand === 'StartupX', 'Should capture brand name');
    assert(audit.completedLayers === 2, 'Should have 2 completed layers (name + archetype)');
    assert(audit.completionPercentage === 33, 'Should be 33% complete');
    assert(audit.culturalDominanceReady === false, 'Should not be ready for cultural dominance');
    assert(audit.recommendations.length >= 4, 'Should have at least 4 recommendations');
    console.log(`✓ Incomplete brand audit: ${audit.completionPercentage}% complete, ${audit.recommendations.length} recommendations\n`);
} catch (error) {
    console.error('✗ Incomplete brand audit test failed:', error.message);
    process.exit(1);
}

// Test 17: Full brand stack audit — unnamed brand
console.log('Test 17: Audit an unnamed brand');
try {
    const audit = auditBrandStack({});
    assert(audit.brand === '(unnamed)', 'Should show (unnamed) for missing name');
    assert(audit.layers.BRAND_CORE === false, 'BRAND_CORE should be false without name');
    assert(audit.culturalDominanceReady === false, 'Should not be ready');
    assert(audit.recommendations.some(r => r.includes('Simple Name')), 'Should recommend Simple Name');
    console.log('✓ Unnamed brand audit handled correctly\n');
} catch (error) {
    console.error('✗ Unnamed brand audit test failed:', error.message);
    process.exit(1);
}

console.log('='.repeat(50));
console.log('✓ All Brand Architecture Engine tests passed!');
console.log('='.repeat(50));
