/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateFreeOrderRequestInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: CreateFreeOrderRequest
// ====================================================

export interface CreateFreeOrderRequest_request {
  __typename: 'IdentifyEntity';
  id: string;
}

export interface CreateFreeOrderRequest {
  request: CreateFreeOrderRequest_request;
}

export interface CreateFreeOrderRequestVariables {
  input: CreateFreeOrderRequestInput;
}
