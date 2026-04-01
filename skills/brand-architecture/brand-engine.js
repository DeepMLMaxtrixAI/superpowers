/**
 * Brand Architecture Engine
 *
 * Programmatic interface to the six-layer Brand Stack framework.
 * Produces multi-decade cultural equity through archetype, narrative,
 * ecosystem, trust, and amplification layers.
 *
 * Master formula:
 *   Clear archetype + Compelling narrative + Integrated ecosystem = Cultural dominance
 *
 * Equity formula:
 *   Simple Name + Strong Visual Symbol + Authority Persona + Cultural Story Loop
 *   = Multi-Decade Brand Equity
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load the brand-architecture configuration.
 * @returns {Object} Full configuration object
 */
export function loadBrandArchitecture() {
    const configPath = path.join(__dirname, 'brand-architecture.json');
    try {
        const configData = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        throw new Error(`Failed to load brand-architecture configuration: ${error.message}`);
    }
}

/**
 * Return the ordered list of brand stack layer names (bottom to top).
 * @returns {string[]} Layer names in ascending order
 */
export function getLayerOrder() {
    const config = loadBrandArchitecture();
    return Object.entries(config.layers)
        .sort(([, a], [, b]) => a.level - b.level)
        .map(([name]) => name);
}

/**
 * Get detailed information about a single brand stack layer.
 * @param {string} layerName - e.g. 'BRAND_CORE', 'NARRATIVE_ENGINE'
 * @returns {Object} Layer details including description, inputs, output, and criteria
 */
export function getLayerDetails(layerName) {
    const config = loadBrandArchitecture();

    if (!config.layers[layerName]) {
        const available = Object.keys(config.layers).join(', ');
        throw new Error(`Unknown brand layer: "${layerName}". Available layers: ${available}`);
    }

    return { name: layerName, ...config.layers[layerName] };
}

/**
 * Validate an archetype name against the canonical list.
 * @param {string} archetype - Archetype to validate
 * @returns {boolean} True when the archetype is recognised
 */
export function isValidArchetype(archetype) {
    const config = loadBrandArchitecture();
    return config.layers.ARCHETYPE_IDENTITY.archetypes.includes(archetype);
}

/**
 * Return all recognised archetypes.
 * @returns {string[]} List of archetype names
 */
export function getArchetypes() {
    const config = loadBrandArchitecture();
    return config.layers.ARCHETYPE_IDENTITY.archetypes;
}

/**
 * Apply the master formula to assess whether three brand inputs
 * are present and produce cultural dominance.
 * @param {Object} inputs
 * @param {boolean} inputs.clear_archetype
 * @param {boolean} inputs.compelling_narrative
 * @param {boolean} inputs.integrated_ecosystem
 * @returns {Object} Formula result with output and gap analysis
 */
export function applyMasterFormula({ clear_archetype, compelling_narrative, integrated_ecosystem }) {
    const config = loadBrandArchitecture();
    const gaps = [];

    if (!clear_archetype) gaps.push('clear_archetype');
    if (!compelling_narrative) gaps.push('compelling_narrative');
    if (!integrated_ecosystem) gaps.push('integrated_ecosystem');

    const achieved = gaps.length === 0;

    return {
        formula: config.master_formula,
        inputs: { clear_archetype, compelling_narrative, integrated_ecosystem },
        output: achieved ? config.master_formula.output : null,
        achieved,
        gaps,
        evaluatedAt: new Date().toISOString()
    };
}

/**
 * Apply the equity formula to assess multi-decade brand equity readiness.
 * @param {Object} inputs
 * @param {boolean} inputs.simple_name
 * @param {boolean} inputs.strong_visual_symbol
 * @param {boolean} inputs.authority_persona
 * @param {boolean} inputs.cultural_story_loop
 * @returns {Object} Equity formula result with output and gap analysis
 */
export function applyEquityFormula({ simple_name, strong_visual_symbol, authority_persona, cultural_story_loop }) {
    const config = loadBrandArchitecture();
    const gaps = [];

    if (!simple_name) gaps.push('simple_name');
    if (!strong_visual_symbol) gaps.push('strong_visual_symbol');
    if (!authority_persona) gaps.push('authority_persona');
    if (!cultural_story_loop) gaps.push('cultural_story_loop');

    const achieved = gaps.length === 0;

    return {
        formula: config.equity_formula,
        inputs: { simple_name, strong_visual_symbol, authority_persona, cultural_story_loop },
        output: achieved ? config.equity_formula.output : null,
        achieved,
        gaps,
        evaluatedAt: new Date().toISOString()
    };
}

/**
 * Execute a SWOT-BRAND-REFINE loop against a specific layer.
 * @param {string} layerName - Brand stack layer to audit
 * @returns {Object} Loop definition for the given layer
 */
export function executeDecisionLoop(layerName) {
    const config = loadBrandArchitecture();

    if (!config.layers[layerName]) {
        const available = Object.keys(config.layers).join(', ');
        throw new Error(`Unknown brand layer: "${layerName}". Available layers: ${available}`);
    }

    const layer = config.layers[layerName];
    const loop = config.decision_loop;

    return {
        loop: loop.name,
        prompt: loop.prompt,
        targetLayer: layerName,
        layerDescription: layer.description,
        steps: loop.steps,
        expectedOutput: layer.output,
        executedAt: new Date().toISOString()
    };
}

/**
 * Return the full Cultural Story Loop for the NARRATIVE_ENGINE layer.
 * @returns {string[]} Ordered steps of the story loop
 */
export function getCulturalStoryLoop() {
    const config = loadBrandArchitecture();
    return config.layers.NARRATIVE_ENGINE.cultural_story_loop;
}

/**
 * Return the key principles of the Brand Architecture framework.
 * @returns {string[]} List of guiding principles
 */
export function getKeyPrinciples() {
    const config = loadBrandArchitecture();
    return config.key_principles;
}

/**
 * Produce a complete brand stack audit summary for a brand description.
 * @param {Object} brand - Brand details to evaluate
 * @param {string} brand.name - Brand name
 * @param {string} [brand.archetype] - Selected archetype
 * @param {boolean} [brand.hasNarrative] - Whether a narrative exists
 * @param {boolean} [brand.hasEcosystem] - Whether an integrated product ecosystem exists
 * @param {boolean} [brand.hasTrustInfrastructure] - Whether trust signals are in place
 * @param {boolean} [brand.hasAmplificationMechanisms] - Whether amplification mechanisms exist
 * @returns {Object} Audit result with layer statuses, gaps, and recommendations
 */
export function auditBrandStack(brand) {
    const config = loadBrandArchitecture();
    const layers = getLayerOrder();
    const layerStatuses = {};
    const recommendations = [];

    // BRAND_CORE: name must be present
    layerStatuses.BRAND_CORE = !!brand.name;
    if (!brand.name) recommendations.push('Define a Simple Name and core positioning sentence for BRAND_CORE.');

    // ARCHETYPE_IDENTITY: valid archetype required
    layerStatuses.ARCHETYPE_IDENTITY = !!(brand.archetype && isValidArchetype(brand.archetype));
    if (!layerStatuses.ARCHETYPE_IDENTITY) {
        recommendations.push(`Select a canonical archetype for ARCHETYPE_IDENTITY. Available: ${getArchetypes().join(', ')}.`);
    }

    // NARRATIVE_ENGINE: narrative presence
    layerStatuses.NARRATIVE_ENGINE = !!brand.hasNarrative;
    if (!brand.hasNarrative) recommendations.push('Build a Cultural Story Loop for NARRATIVE_ENGINE.');

    // PRODUCT_ECOSYSTEM: ecosystem presence
    layerStatuses.PRODUCT_ECOSYSTEM = !!brand.hasEcosystem;
    if (!brand.hasEcosystem) recommendations.push('Map entry, core, and ascension offers for PRODUCT_ECOSYSTEM.');

    // TRUST_INFRASTRUCTURE: trust signals presence
    layerStatuses.TRUST_INFRASTRUCTURE = !!brand.hasTrustInfrastructure;
    if (!brand.hasTrustInfrastructure) recommendations.push('Build the Trust Stack (authority, social proof, transparency) for TRUST_INFRASTRUCTURE.');

    // CULTURAL_AMPLIFICATION: amplification mechanisms
    layerStatuses.CULTURAL_AMPLIFICATION = !!brand.hasAmplificationMechanisms;
    if (!brand.hasAmplificationMechanisms) recommendations.push('Design organic loops and cultural hooks for CULTURAL_AMPLIFICATION.');

    const completedLayers = Object.values(layerStatuses).filter(Boolean).length;
    const totalLayers = layers.length;
    const completionPercentage = Math.round((completedLayers / totalLayers) * 100);

    return {
        brand: brand.name || '(unnamed)',
        layers: layerStatuses,
        completedLayers,
        totalLayers,
        completionPercentage,
        recommendations,
        culturalDominanceReady: completedLayers === totalLayers,
        auditedAt: new Date().toISOString()
    };
}
