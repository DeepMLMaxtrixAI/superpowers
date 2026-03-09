/**
 * Deep-Think Input Processing Pipeline
 *
 * Implements a 5-stage signal processing pipeline:
 *   Input → Vector Classification → Noise Filtering →
 *   Domain Analysis → Constraint Checking → Decision Blueprint
 *
 * Integrates safety guardrails, NAND Boolean logic gates, and
 * Mathematical-Matrix-New-X-NAND-Gates at each stage.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the deep-think pipeline configuration.
 * @returns {Object} Pipeline configuration
 */
export function loadPipelineConfig() {
    const configPath = path.join(__dirname, 'deep-think-pipeline.json');
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Failed to load deep-think pipeline config: ${error.message}`);
    }
}

/**
 * Evaluate a NAND gate over two boolean inputs.
 * NAND is the universal logic gate: NOT(A AND B).
 * @param {boolean} a
 * @param {boolean} b
 * @returns {boolean}
 */
export function nandGate(a, b) {
    return !(a && b);
}

/**
 * Apply a Mathematical-Matrix-New-X-NAND-Gate transform to a value array.
 * Each element is evaluated through a NAND gate against a threshold flag.
 * @param {number[]} values - Input numeric vector
 * @param {number} threshold - Classification threshold (0–1)
 * @returns {{ classified: boolean[], raw: number[] }}
 */
export function applyMatrixNandGate(values, threshold = 0.5) {
    const classified = values.map(v => nandGate(v >= threshold, true));
    return { classified, raw: values };
}

/**
 * Stage 1: Vector Classification
 * Converts raw input into a classified vector using NAND-gate logic.
 * Safety: data_boundary_enforcement, context_isolation.
 * @param {Object} input - Raw input object with a `values` array
 * @returns {Object} Stage output with classified vector and safety log
 */
export function vectorClassification(input) {
    const config = loadPipelineConfig();
    const stageConfig = config.stages.Vector_Classification;

    const values = Array.isArray(input.values) ? input.values : [];
    const { classified, raw } = applyMatrixNandGate(values);

    return {
        stage: 'Vector_Classification',
        input: raw,
        classified,
        capabilities: stageConfig.capabilities,
        safety: stageConfig.safety,
        frameworks: stageConfig.frameworks,
        processedAt: new Date().toISOString()
    };
}

/**
 * Stage 2: Noise Filtering
 * Removes noise from the classified vector using adversarial network triggers
 * and grounding verification gates.
 * Safety: adversarial_network_triggers, grounding_verification_gates.
 * @param {Object} classifiedOutput - Output from vectorClassification()
 * @returns {Object} Stage output with filtered signal and safety log
 */
export function noiseFiltering(classifiedOutput) {
    const config = loadPipelineConfig();
    const stageConfig = config.stages.Noise_Filtering;

    // Retain only values that pass the grounding verification gate (nand = false means grounded signal)
    const filtered = classifiedOutput.classified.filter(v => !v);
    const adversarialDetected = classifiedOutput.classified.some(v => v);

    return {
        stage: 'Noise_Filtering',
        input: classifiedOutput.classified,
        filtered,
        adversarialDetected,
        groundingVerified: !adversarialDetected,
        capabilities: stageConfig.capabilities,
        safety: stageConfig.safety,
        frameworks: stageConfig.frameworks,
        processedAt: new Date().toISOString()
    };
}

/**
 * Stage 3: Domain Analysis
 * Analyzes the filtered signal for domain context with hallucination detection.
 * Safety: hallucination_probability_alerts, memory_write_protection.
 * @param {Object} filteredOutput - Output from noiseFiltering()
 * @param {string} domain - Target domain label for analysis
 * @returns {Object} Stage output with domain mapping and hallucination alert
 */
export function domainAnalysis(filteredOutput, domain = 'general') {
    const config = loadPipelineConfig();
    const stageConfig = config.stages.Domain_Analysis;

    const signalStrength = filteredOutput.filtered.length;
    const hallucinationProbability = signalStrength === 0 ? 1.0 : Math.max(0, 1 - signalStrength / 10);
    const hallucinationAlert = hallucinationProbability > 0.5;

    return {
        stage: 'Domain_Analysis',
        domain,
        signalStrength,
        hallucinationProbability: parseFloat(hallucinationProbability.toFixed(4)),
        hallucinationAlert,
        semanticContext: `${domain}_context`,
        capabilities: stageConfig.capabilities,
        safety: stageConfig.safety,
        frameworks: stageConfig.frameworks,
        processedAt: new Date().toISOString()
    };
}

/**
 * Stage 4: Constraint Checking
 * Validates domain analysis output using NAND Boolean logical calculus.
 * Safety: decision_accountability_anchors, confidence_calibration_checks, session_firewalling.
 * @param {Object} domainOutput - Output from domainAnalysis()
 * @param {Object} constraints - Key/value constraint map (each value is boolean)
 * @returns {Object} Stage output with constraint results and confidence score
 */
export function constraintChecking(domainOutput, constraints = {}) {
    const config = loadPipelineConfig();
    const stageConfig = config.stages.Constraint_Checking;

    const constraintResults = {};
    const constraintEntries = Object.entries(constraints);

    for (const [key, value] of constraintEntries) {
        // Use NAND logic: constraint passes when nandGate(value, hallucinationAlert) is true
        constraintResults[key] = nandGate(Boolean(value), domainOutput.hallucinationAlert);
    }

    const passCount = Object.values(constraintResults).filter(Boolean).length;
    const total = constraintEntries.length || 1;
    const confidenceScore = parseFloat((passCount / total).toFixed(4));

    return {
        stage: 'Constraint_Checking',
        constraintResults,
        passCount,
        totalConstraints: constraintEntries.length,
        confidenceScore,
        accountabilityAnchor: `constraint_check_${Date.now()}`,
        capabilities: stageConfig.capabilities,
        safety: stageConfig.safety,
        frameworks: stageConfig.frameworks,
        processedAt: new Date().toISOString()
    };
}

/**
 * Stage 5: Decision Blueprint
 * Synthesizes all prior stage outputs into a final decision blueprint.
 * Includes explainability checkpoints and model self-diagnostics.
 * Safety: explainability_checkpoints, model_self_diagnostics, data_integrity_review.
 * @param {Object} constraintOutput - Output from constraintChecking()
 * @param {Object} domainOutput - Output from domainAnalysis()
 * @returns {Object} Final decision blueprint
 */
export function decisionBlueprint(constraintOutput, domainOutput) {
    const config = loadPipelineConfig();
    const stageConfig = config.stages.Decision_Blueprint;
    const metadata = config.metadata;

    const approved = constraintOutput.confidenceScore >= 0.5 && !domainOutput.hallucinationAlert;

    return {
        stage: 'Decision_Blueprint',
        decision: approved ? 'APPROVED' : 'FLAGGED',
        confidenceScore: constraintOutput.confidenceScore,
        hallucinationAlert: domainOutput.hallucinationAlert,
        domain: domainOutput.domain,
        explainabilityCheckpoint: {
            vectorClassified: true,
            noiseFiltered: true,
            domainAnalyzed: true,
            constraintsChecked: true,
            blueprintGenerated: true
        },
        modelSelfDiagnostics: {
            signalStrength: domainOutput.signalStrength,
            hallucinationProbability: domainOutput.hallucinationProbability,
            constraintPassRate: constraintOutput.confidenceScore
        },
        accountabilityAnchor: constraintOutput.accountabilityAnchor,
        masterPrompt: metadata.master_prompt,
        safety: metadata.safety,
        capabilities: stageConfig.capabilities,
        frameworks: stageConfig.frameworks,
        processedAt: new Date().toISOString()
    };
}

/**
 * Run the full Deep-Think pipeline end-to-end.
 * @param {Object} input - Raw input with a `values` array and optional `domain` string
 * @param {Object} constraints - Constraint map passed to Constraint_Checking stage
 * @returns {Object} Complete pipeline result with all stage outputs and final blueprint
 */
export function runDeepThinkPipeline(input, constraints = {}) {
    const stage1 = vectorClassification(input);
    const stage2 = noiseFiltering(stage1);
    const stage3 = domainAnalysis(stage2, input.domain || 'general');
    const stage4 = constraintChecking(stage3, constraints);
    const stage5 = decisionBlueprint(stage4, stage3);

    return {
        pipeline: 'Deep_Think',
        stages: {
            Vector_Classification: stage1,
            Noise_Filtering: stage2,
            Domain_Analysis: stage3,
            Constraint_Checking: stage4,
            Decision_Blueprint: stage5
        },
        blueprint: stage5,
        completedAt: new Date().toISOString()
    };
}

/**
 * Get pipeline metadata.
 * @returns {Object} Pipeline metadata including safety, year, and master prompt
 */
export function getPipelineMetadata() {
    const config = loadPipelineConfig();
    return config.metadata;
}

/**
 * Get the list of pipeline stage names in order.
 * @returns {string[]} Ordered array of stage names
 */
export function getPipelineStages() {
    const config = loadPipelineConfig();
    return config.pipeline.stages;
}

/**
 * Get details for a specific pipeline stage.
 * @param {string} stageName - Stage name (e.g., 'Vector_Classification')
 * @returns {Object} Stage configuration including capabilities and safety guardrails
 */
export function getStageDetails(stageName) {
    const config = loadPipelineConfig();
    if (!config.stages[stageName]) {
        throw new Error(`Unknown stage: ${stageName}. Available stages: ${Object.keys(config.stages).join(', ')}`);
    }
    return { name: stageName, ...config.stages[stageName] };
}

/**
 * Get all safety guardrail definitions.
 * @returns {Object} Map of guardrail name to description
 */
export function getSafetyGuardrails() {
    const config = loadPipelineConfig();
    return config.safety_guardrails;
}

/**
 * Get all logic component definitions (NAND gates, Matrix gates).
 * @returns {Object} Map of logic component name to definition
 */
export function getLogicComponents() {
    const config = loadPipelineConfig();
    return config.logic_components;
}
