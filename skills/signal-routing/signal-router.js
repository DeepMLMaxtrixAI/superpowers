/**
 * Signal-to-Engine Router
 * 
 * Intelligent routing system that directs signals to their appropriate
 * AI processing engines based on signal type.
 * 
 * Part of the SuperGrok Expert-level Mastery Roadmap for 2026
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load signal-engine mapping configuration
 * @returns {Object} Configuration object with mappings and engine details
 */
export function loadSignalEngineMapping() {
    const configPath = path.join(__dirname, 'signal-engine-mapping.json');
    try {
        const configData = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(configData);
    } catch (error) {
        throw new Error(`Failed to load signal-engine mapping: ${error.message}`);
    }
}

/**
 * Route a signal to its appropriate processing engine
 * @param {string} signalType - Type of signal (e.g., 'Tommy_Vectors', 'Contracts')
 * @returns {Object} Engine information including name, description, and capabilities
 */
export function routeSignal(signalType) {
    const config = loadSignalEngineMapping();
    
    if (!config.mappings[signalType]) {
        throw new Error(`Unknown signal type: ${signalType}. Available types: ${Object.keys(config.mappings).join(', ')}`);
    }
    
    const engineName = config.mappings[signalType];
    const engineDetails = config.engines[engineName];
    
    return {
        signalType,
        engine: engineName,
        ...engineDetails,
        routedAt: new Date().toISOString()
    };
}

/**
 * Get all available signal types
 * @returns {Array<string>} List of supported signal types
 */
export function getAvailableSignalTypes() {
    const config = loadSignalEngineMapping();
    return Object.keys(config.mappings);
}

/**
 * Get all available engines
 * @returns {Array<string>} List of available processing engines
 */
export function getAvailableEngines() {
    const config = loadSignalEngineMapping();
    return Object.keys(config.engines);
}

/**
 * Get detailed information about a specific engine
 * @param {string} engineName - Name of the engine
 * @returns {Object} Engine details including capabilities and frameworks
 */
export function getEngineDetails(engineName) {
    const config = loadSignalEngineMapping();
    
    if (!config.engines[engineName]) {
        throw new Error(`Unknown engine: ${engineName}. Available engines: ${Object.keys(config.engines).join(', ')}`);
    }
    
    return {
        name: engineName,
        ...config.engines[engineName]
    };
}

/**
 * Batch route multiple signals
 * @param {Array<string>} signalTypes - Array of signal types to route
 * @returns {Array<Object>} Array of routing results
 */
export function batchRouteSignals(signalTypes) {
    return signalTypes.map(signalType => {
        try {
            return routeSignal(signalType);
        } catch (error) {
            return {
                signalType,
                error: error.message,
                routedAt: new Date().toISOString()
            };
        }
    });
}

/**
 * Get routing table as formatted string
 * @returns {string} Formatted routing table
 */
export function getRoutingTable() {
    const config = loadSignalEngineMapping();
    let table = 'Signal_Type            → Primary_Engine\n';
    table += '---------------------------------------------\n';
    
    Object.entries(config.mappings).forEach(([signal, engine]) => {
        const padding = ' '.repeat(22 - signal.length);
        table += `${signal}${padding}→ ${engine}\n`;
    });
    
    return table;
}

/**
 * Validate a signal type
 * @param {string} signalType - Signal type to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidSignalType(signalType) {
    const config = loadSignalEngineMapping();
    return signalType in config.mappings;
}

/**
 * Get metadata about the routing system
 * @returns {Object} System metadata
 */
export function getSystemMetadata() {
    const config = loadSignalEngineMapping();
    return config.metadata;
}

// Master prompt executor
export function executeMasterPrompt(signalType) {
    const routing = routeSignal(signalType);
    const metadata = getSystemMetadata();
    
    return {
        masterPrompt: metadata.master_prompt,
        execution: {
            step1_route: signalType,
            step2_execute: routing.engine,
            step3_synthesize: 'SuperGrok_Insights',
            details: routing
        }
    };
}
