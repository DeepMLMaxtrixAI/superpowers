/**
 * Content Analysis Pipeline
 *
 * A 9-stage sequential pipeline for analysing posts, lectures, and news content:
 *
 *   INPUT CONTENT
 *   ↓ TRANSCRIPT EXTRACTION  (video → text)
 *   ↓ SEMANTIC PARSING
 *   ↓ VECTOR CLASSIFICATION
 *   ↓ PRISM-RAG EVIDENCE RETRIEVAL
 *   ↓ PROPAGANDA / BIAS DETECTOR
 *   ↓ NARRATIVE FRAME ANALYSIS
 *   ↓ SIGNAL SCORING
 *   ↓ DECISION REPORT
 *
 * Each stage is backed by a dedicated engine registered in
 * signal-engine-mapping.json and routable via signal-router.js.
 */

import { routeSignal, batchRouteSignals } from '../signal-routing/signal-router.js';

/**
 * Resolve the engine for each pipeline stage in order.
 *
 * @returns {Array<Object>} Ordered array of stage objects, each containing:
 *   - stage   {number}  1-based stage index
 *   - label   {string}  Human-readable stage name
 *   - signal  {string}  Signal type fed into the stage
 *   - engine  {string}  Engine that processes the stage
 *   - description, capabilities, frameworks – forwarded from engine config
 */
export function getPipelineStages() {
    const stages = [
        { label: 'INPUT CONTENT',                signal: 'Content_Input' },
        { label: 'TRANSCRIPT EXTRACTION',        signal: 'Content_Input' },
        { label: 'SEMANTIC PARSING',             signal: 'Transcript' },
        { label: 'VECTOR CLASSIFICATION',        signal: 'Parsed_Semantics' },
        { label: 'PRISM-RAG EVIDENCE RETRIEVAL', signal: 'Vector_Features' },
        { label: 'PROPAGANDA / BIAS DETECTOR',   signal: 'Evidence_Bundle' },
        { label: 'NARRATIVE FRAME ANALYSIS',     signal: 'Bias_Analysis' },
        { label: 'SIGNAL SCORING',               signal: 'Narrative_Frame' },
        { label: 'DECISION REPORT',              signal: 'Scored_Signal' },
    ];

    return stages.map((s, i) => {
        const routing = routeSignal(s.signal);
        return {
            stage: i + 1,
            label: s.label,
            signal: s.signal,
            engine: routing.engine,
            description: routing.description,
            capabilities: routing.capabilities,
            frameworks: routing.frameworks,
        };
    });
}

/**
 * Execute the full content analysis pipeline for a given input descriptor.
 *
 * In a live system each stage would call the real engine. Here we model the
 * pipeline structurally: every stage is routed to its engine and the result
 * is recorded so callers can inspect the complete execution trace.
 *
 * @param {Object} input  Description of the content to analyse.
 *   - type    {string}  Content type: 'post' | 'lecture' | 'news'
 *   - source  {string}  URL, filename, or identifier
 *   - [meta]  {Object}  Optional additional metadata
 * @returns {Object} Pipeline execution result:
 *   - input      {Object}         Original input descriptor
 *   - stages     {Array<Object>}  Per-stage execution records
 *   - summary    {Object}         High-level result
 *   - executedAt {string}         ISO timestamp
 */
export function runPipeline(input) {
    if (!input || !input.type || !input.source) {
        throw new Error('Input must include "type" (post|lecture|news) and "source" fields.');
    }

    const validTypes = ['post', 'lecture', 'news'];
    if (!validTypes.includes(input.type)) {
        throw new Error(`Invalid input type "${input.type}". Must be one of: ${validTypes.join(', ')}.`);
    }

    const pipelineStages = getPipelineStages();
    const executedAt = new Date().toISOString();

    const stages = pipelineStages.map(s => ({
        stage: s.stage,
        label: s.label,
        signal: s.signal,
        engine: s.engine,
        status: 'routed',
        routedAt: executedAt,
    }));

    const summary = {
        totalStages: stages.length,
        enginesInvolved: [...new Set(stages.map(s => s.engine))],
        inputType: input.type,
        source: input.source,
        pipelineVersion: '1.0.0',
    };

    return {
        input,
        stages,
        summary,
        executedAt,
    };
}

/**
 * Return a formatted diagram of the pipeline matching the problem-statement layout.
 *
 * @returns {string} Multi-line ASCII diagram
 */
export function getPipelineDiagram() {
    const stageLabels = [
        'INPUT CONTENT\n(posts / lectures / news)',
        'TRANSCRIPT EXTRACTION\n(video → text)',
        'SEMANTIC PARSING',
        'VECTOR CLASSIFICATION',
        'PRISM-RAG EVIDENCE RETRIEVAL',
        'PROPAGANDA / BIAS DETECTOR',
        'NARRATIVE FRAME ANALYSIS',
        'SIGNAL SCORING',
        'DECISION REPORT',
    ];

    return stageLabels
        .map((label, i) => (i === 0 ? label : `↓\n${label}`))
        .join('\n\n');
}

/**
 * Batch-route all pipeline signal types at once and return the routing map.
 *
 * @returns {Object} Map of signal type → engine name for every pipeline stage
 */
export function getPipelineRoutingMap() {
    const signals = [
        'Content_Input',
        'Transcript',
        'Parsed_Semantics',
        'Vector_Features',
        'Evidence_Bundle',
        'Bias_Analysis',
        'Narrative_Frame',
        'Scored_Signal',
    ];

    const results = batchRouteSignals(signals);
    const map = {};
    results.forEach(r => {
        map[r.signalType] = r.engine;
    });
    return map;
}
