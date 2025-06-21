// Validation utilities for Osmosis MCP server
import { z } from 'zod';

// Common validation schemas
export const addressSchema = z.string().min(1, 'Address is required');
export const poolIdSchema = z.string().min(1, 'Pool ID is required');
export const positiveNumberSchema = z.string().regex(/^\d+$/, 'Must be a positive number');
export const timestampSchema = z.string().refine(
  (val) => !isNaN(Date.parse(val)),
  'Must be a valid timestamp'
);

// Pool-related schemas
export const poolInfoSchema = z.object({
  poolId: poolIdSchema
});

export const spotPriceSchema = z.object({
  poolId: poolIdSchema,
  baseAssetDenom: z.string().min(1, 'Base asset denomination is required'),
  quoteAssetDenom: z.string().min(1, 'Quote asset denomination is required')
});

export const swapEstimateSchema = z.object({
  poolId: poolIdSchema,
  tokenIn: z.string().min(1, 'Input token denomination is required'),
  tokenOut: z.string().min(1, 'Output token denomination is required'),
  amount: positiveNumberSchema
});

// Staking-related schemas
export const delegatorSchema = z.object({
  delegatorAddress: addressSchema
});

export const validatorStatusSchema = z.object({
  status: z.enum(['BOND_STATUS_BONDED', 'BOND_STATUS_UNBONDING', 'BOND_STATUS_UNBONDED']).optional()
});

// Governance schemas
export const proposalSchema = z.object({
  proposalId: positiveNumberSchema
});

export const proposalVotesSchema = z.object({
  proposalId: positiveNumberSchema,
  limit: positiveNumberSchema.optional()
});

// TWAP schema
export const twapSchema = z.object({
  poolId: poolIdSchema,
  baseAsset: z.string().min(1, 'Base asset is required'),
  quoteAsset: z.string().min(1, 'Quote asset is required'),
  startTime: timestampSchema,
  endTime: timestampSchema.optional()
});

// CL schemas
export const clPositionSchema = z.object({
  positionId: positiveNumberSchema
});

export const clUserPositionsSchema = z.object({
  address: addressSchema
});

// Token factory schemas
export const creatorSchema = z.object({
  creator: addressSchema
});

// Pagination schema
export const paginationSchema = z.object({
  limit: positiveNumberSchema.optional()
});

/**
 * Validate input against a schema and return typed result
 */
export function validateInput<T>(schema: z.ZodSchema<T>, input: any): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      throw new Error(`Validation error: ${messages.join(', ')}`);
    }
    throw error;
  }
}