/**
 * Tests for Content Analysis Pipeline
 *
 * Validates the 9-stage content analysis pipeline:
 *   INPUT CONTENT → TRANSCRIPT EXTRACTION → SEMANTIC PARSING → VECTOR CLASSIFICATION
 *   → PRISM-RAG EVIDENCE RETRIEVAL → PROPAGANDA/BIAS DETECTOR → NARRATIVE FRAME ANALYSIS
 *   → SIGNAL SCORING → DECISION REPORT
 */

import { strict as assert } from 'assert';
import {
    getPipelineStages,
    getPipelineDiagram,
    getPipelineRoutingMap,
    runPipeline,
} from '../../skills/content-analysis-pipeline/pipeline.js';

console.log('Starting Content Analysis Pipeline Tests...\n');

// Test 1: getPipelineStages returns 9 stages
console.log('Test 1: getPipelineStages returns 9 ordered stages');
try {
    const stages = getPipelineStages();
    assert(Array.isArray(stages), 'Should return an array');
    assert(stages.length === 9, `Should have 9 stages, got ${stages.length}`);

    stages.forEach((s, i) => {
        assert(typeof s.stage === 'number', `Stage ${i + 1} should have a numeric stage index`);
        assert(s.stage === i + 1, `Stage index should be ${i + 1}`);
        assert(typeof s.label === 'string' && s.label.length > 0, `Stage ${i + 1} should have a label`);
        assert(typeof s.signal === 'string' && s.signal.length > 0, `Stage ${i + 1} should have a signal`);
        assert(typeof s.engine === 'string' && s.engine.length > 0, `Stage ${i + 1} should have an engine`);
        assert(typeof s.description === 'string', `Stage ${i + 1} should have a description`);
        assert(Array.isArray(s.capabilities), `Stage ${i + 1} should have capabilities`);
        assert(Array.isArray(s.frameworks), `Stage ${i + 1} should have frameworks`);
    });

    console.log('✓ 9 pipeline stages returned with correct shape\n');
} catch (error) {
    console.error('✗ getPipelineStages failed:', error.message);
    process.exit(1);
}

// Test 2: Correct engine assignments per stage
console.log('Test 2: Correct engine assigned to each stage');
try {
    const stages = getPipelineStages();

    const expectedEngines = [
        'Transcript_Extractor',      // Stage 1 - INPUT CONTENT
        'Transcript_Extractor',      // Stage 2 - TRANSCRIPT EXTRACTION
        'Semantic_Parser',           // Stage 3 - SEMANTIC PARSING
        'Vector_Classifier',         // Stage 4 - VECTOR CLASSIFICATION
        'PRISM_RAG_Retriever',       // Stage 5 - PRISM-RAG EVIDENCE RETRIEVAL
        'Propaganda_Bias_Detector',  // Stage 6 - PROPAGANDA / BIAS DETECTOR
        'Narrative_Frame_Analyzer',  // Stage 7 - NARRATIVE FRAME ANALYSIS
        'Signal_Scorer',             // Stage 8 - SIGNAL SCORING
        'Decision_Reporter',         // Stage 9 - DECISION REPORT
    ];

    expectedEngines.forEach((expectedEngine, i) => {
        const s = stages[i];
        assert(
            s.engine === expectedEngine,
            `Stage ${i + 1} (${s.label}) should use engine ${expectedEngine}, got ${s.engine}`,
        );
        console.log(`✓ Stage ${i + 1}: ${s.label} → ${s.engine}`);
    });

    console.log('✓ All stage-to-engine assignments are correct\n');
} catch (error) {
    console.error('✗ Engine assignment check failed:', error.message);
    process.exit(1);
}

// Test 3: Stage labels include all required names
console.log('Test 3: Stage labels cover the full pipeline');
try {
    const stages = getPipelineStages();
    const labels = stages.map(s => s.label);

    const requiredLabels = [
        'INPUT CONTENT',
        'TRANSCRIPT EXTRACTION',
        'SEMANTIC PARSING',
        'VECTOR CLASSIFICATION',
        'PRISM-RAG EVIDENCE RETRIEVAL',
        'PROPAGANDA / BIAS DETECTOR',
        'NARRATIVE FRAME ANALYSIS',
        'SIGNAL SCORING',
        'DECISION REPORT',
    ];

    requiredLabels.forEach(required => {
        assert(labels.includes(required), `Labels should include "${required}"`);
    });

    console.log('✓ All required stage labels present\n');
} catch (error) {
    console.error('✗ Stage label check failed:', error.message);
    process.exit(1);
}

// Test 4: getPipelineDiagram returns valid diagram string
console.log('Test 4: getPipelineDiagram returns a valid diagram');
try {
    const diagram = getPipelineDiagram();
    assert(typeof diagram === 'string', 'Should return a string');
    assert(diagram.includes('INPUT CONTENT'), 'Diagram should include INPUT CONTENT');
    assert(diagram.includes('TRANSCRIPT EXTRACTION'), 'Diagram should include TRANSCRIPT EXTRACTION');
    assert(diagram.includes('SEMANTIC PARSING'), 'Diagram should include SEMANTIC PARSING');
    assert(diagram.includes('VECTOR CLASSIFICATION'), 'Diagram should include VECTOR CLASSIFICATION');
    assert(diagram.includes('PRISM-RAG EVIDENCE RETRIEVAL'), 'Diagram should include PRISM-RAG EVIDENCE RETRIEVAL');
    assert(diagram.includes('PROPAGANDA / BIAS DETECTOR'), 'Diagram should include PROPAGANDA / BIAS DETECTOR');
    assert(diagram.includes('NARRATIVE FRAME ANALYSIS'), 'Diagram should include NARRATIVE FRAME ANALYSIS');
    assert(diagram.includes('SIGNAL SCORING'), 'Diagram should include SIGNAL SCORING');
    assert(diagram.includes('DECISION REPORT'), 'Diagram should include DECISION REPORT');
    assert(diagram.includes('↓'), 'Diagram should include downward arrows');
    console.log('Pipeline diagram:\n');
    console.log(diagram);
    console.log('\n✓ Diagram returned correctly\n');
} catch (error) {
    console.error('✗ getPipelineDiagram failed:', error.message);
    process.exit(1);
}

// Test 5: getPipelineRoutingMap returns correct signal→engine map
console.log('Test 5: getPipelineRoutingMap returns correct routing map');
try {
    const map = getPipelineRoutingMap();
    assert(typeof map === 'object', 'Should return an object');

    const expectedMap = {
        'Content_Input':    'Transcript_Extractor',
        'Transcript':       'Semantic_Parser',
        'Parsed_Semantics': 'Vector_Classifier',
        'Vector_Features':  'PRISM_RAG_Retriever',
        'Evidence_Bundle':  'Propaganda_Bias_Detector',
        'Bias_Analysis':    'Narrative_Frame_Analyzer',
        'Narrative_Frame':  'Signal_Scorer',
        'Scored_Signal':    'Decision_Reporter',
    };

    Object.entries(expectedMap).forEach(([signal, expectedEngine]) => {
        assert(
            map[signal] === expectedEngine,
            `Signal "${signal}" should map to "${expectedEngine}", got "${map[signal]}"`,
        );
        console.log(`✓ ${signal} → ${map[signal]}`);
    });

    console.log('✓ Routing map is correct\n');
} catch (error) {
    console.error('✗ getPipelineRoutingMap failed:', error.message);
    process.exit(1);
}

// Test 6: runPipeline accepts valid inputs
console.log('Test 6: runPipeline accepts valid content types');
try {
    const validInputs = [
        { type: 'post',    source: 'https://example.com/post/123' },
        { type: 'lecture', source: 'lecture-2026-03.mp4' },
        { type: 'news',    source: 'https://news.example.com/article' },
    ];

    validInputs.forEach(input => {
        const result = runPipeline(input);
        assert(result.input === input, 'Result should reference original input');
        assert(Array.isArray(result.stages), 'Result should have stages array');
        assert(result.stages.length === 9, `Result should have 9 stages, got ${result.stages.length}`);
        assert(result.summary, 'Result should have summary');
        assert(result.summary.totalStages === 9, 'Summary should report 9 stages');
        assert(result.summary.inputType === input.type, 'Summary should record input type');
        assert(result.summary.source === input.source, 'Summary should record source');
        assert(typeof result.executedAt === 'string', 'Result should have executedAt timestamp');
        console.log(`✓ runPipeline({ type: '${input.type}' }) executed successfully`);
    });

    console.log('✓ All valid inputs processed correctly\n');
} catch (error) {
    console.error('✗ runPipeline (valid inputs) failed:', error.message);
    process.exit(1);
}

// Test 7: runPipeline rejects missing fields
console.log('Test 7: runPipeline rejects invalid inputs');
try {
    const invalidInputs = [
        [null,                          'null input'],
        [undefined,                     'undefined input'],
        [{},                            'empty object'],
        [{ type: 'post' },              'missing source'],
        [{ source: 'https://x.com' },   'missing type'],
        [{ type: 'video', source: 'x' },'invalid type'],
    ];

    invalidInputs.forEach(([input, desc]) => {
        let threw = false;
        try {
            runPipeline(input);
        } catch (e) {
            threw = true;
        }
        assert(threw, `runPipeline should throw for ${desc}`);
        console.log(`✓ Correctly rejected: ${desc}`);
    });

    console.log('✓ Invalid inputs rejected correctly\n');
} catch (error) {
    console.error('✗ runPipeline (invalid inputs) failed:', error.message);
    process.exit(1);
}

// Test 8: Pipeline stages all have status 'routed'
console.log('Test 8: All pipeline stages carry status "routed"');
try {
    const result = runPipeline({ type: 'news', source: 'https://example.com/news' });
    result.stages.forEach(s => {
        assert(s.status === 'routed', `Stage ${s.stage} should have status "routed", got "${s.status}"`);
    });
    console.log('✓ All stages carry status "routed"\n');
} catch (error) {
    console.error('✗ Stage status check failed:', error.message);
    process.exit(1);
}

// Test 9: Summary lists unique engines
console.log('Test 9: Summary lists unique engines involved');
try {
    const result = runPipeline({ type: 'lecture', source: 'lecture.mp4' });
    const { enginesInvolved } = result.summary;
    assert(Array.isArray(enginesInvolved), 'enginesInvolved should be an array');

    // All values should be unique
    const unique = new Set(enginesInvolved);
    assert(unique.size === enginesInvolved.length, 'enginesInvolved should contain no duplicates');

    // Must include every pipeline engine
    const requiredEngines = [
        'Transcript_Extractor',
        'Semantic_Parser',
        'Vector_Classifier',
        'PRISM_RAG_Retriever',
        'Propaganda_Bias_Detector',
        'Narrative_Frame_Analyzer',
        'Signal_Scorer',
        'Decision_Reporter',
    ];
    requiredEngines.forEach(engine => {
        assert(enginesInvolved.includes(engine), `enginesInvolved should include ${engine}`);
    });

    console.log(`✓ ${enginesInvolved.length} unique engines: ${enginesInvolved.join(', ')}\n`);
} catch (error) {
    console.error('✗ Unique engines check failed:', error.message);
    process.exit(1);
}

console.log('='.repeat(50));
console.log('✓ All content analysis pipeline tests passed!');
console.log('='.repeat(50));
