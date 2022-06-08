/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SingleSignOn } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DynatraceObservability } from "../dynatraceObservability";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DynatraceSingleSignOnResource,
  SingleSignOnListNextOptionalParams,
  SingleSignOnListOptionalParams,
  SingleSignOnCreateOrUpdateOptionalParams,
  SingleSignOnCreateOrUpdateResponse,
  SingleSignOnGetOptionalParams,
  SingleSignOnGetResponse,
  SingleSignOnListResponse,
  SingleSignOnListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SingleSignOn operations. */
export class SingleSignOnImpl implements SingleSignOn {
  private readonly client: DynatraceObservability;

  /**
   * Initialize a new instance of the class SingleSignOn class.
   * @param client Reference to the service client
   */
  constructor(client: DynatraceObservability) {
    this.client = client;
  }

  /**
   * List all DynatraceSingleSignOnResource by monitorName
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnListOptionalParams
  ): PagedAsyncIterableIterator<DynatraceSingleSignOnResource> {
    const iter = this.listPagingAll(resourceGroupName, monitorName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, monitorName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnListOptionalParams
  ): AsyncIterableIterator<DynatraceSingleSignOnResource[]> {
    let result = await this._list(resourceGroupName, monitorName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        monitorName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnListOptionalParams
  ): AsyncIterableIterator<DynatraceSingleSignOnResource> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      monitorName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create a DynatraceSingleSignOnResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName Single Sign On Configuration Name
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    resource: DynatraceSingleSignOnResource,
    options?: SingleSignOnCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<SingleSignOnCreateOrUpdateResponse>,
      SingleSignOnCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SingleSignOnCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, monitorName, configurationName, resource, options },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a DynatraceSingleSignOnResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName Single Sign On Configuration Name
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    resource: DynatraceSingleSignOnResource,
    options?: SingleSignOnCreateOrUpdateOptionalParams
  ): Promise<SingleSignOnCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      monitorName,
      configurationName,
      resource,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get a DynatraceSingleSignOnResource
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param configurationName Single Sign On Configuration Name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    monitorName: string,
    configurationName: string,
    options?: SingleSignOnGetOptionalParams
  ): Promise<SingleSignOnGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, configurationName, options },
      getOperationSpec
    );
  }

  /**
   * List all DynatraceSingleSignOnResource by monitorName
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    monitorName: string,
    options?: SingleSignOnListOptionalParams
  ): Promise<SingleSignOnListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, options },
      listOperationSpec
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    monitorName: string,
    nextLink: string,
    options?: SingleSignOnListNextOptionalParams
  ): Promise<SingleSignOnListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, monitorName, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DynatraceSingleSignOnResource
    },
    201: {
      bodyMapper: Mappers.DynatraceSingleSignOnResource
    },
    202: {
      bodyMapper: Mappers.DynatraceSingleSignOnResource
    },
    204: {
      bodyMapper: Mappers.DynatraceSingleSignOnResource
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.resource4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DynatraceSingleSignOnResource
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.configurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Dynatrace.Observability/monitors/{monitorName}/singleSignOnConfigurations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DynatraceSingleSignOnResourceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DynatraceSingleSignOnResourceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.monitorName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};