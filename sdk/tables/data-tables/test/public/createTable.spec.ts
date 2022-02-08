// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError, TableClient, TableServiceClient } from "../../src";
import {
  createTableClient,
  createTableServiceClient,
  recordedEnvironmentSetup,
} from "./utils/recordedClient";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { TableServiceErrorResponse } from "../../src/utils/errorHelpers";
import { assert } from "chai";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

describe("TableClient CreationHandling", () => {
  let client: TableClient;
  beforeEach(function () {
    client = createTableClient("testTable");
  });

  it("should not thorw if table already exists", async function () {
    // Mock core-client throwing on error to verify consistenty that don't throw the error
    client.pipeline.addPolicy({
      name: "TableAlreadyExists",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableAlreadyExists",
            },
          },
        };
        throw new RestError("TableAlreadyExists", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });

    await client.createTable({
      onResponse: (response) => {
        assert.equal(response.status, 409);
      },
    });
  });

  it("should throw when 409 and not TableAlreadyExists", async function () {
    // Mock core-client throwing on error to verify consistenty that we surface the error
    client.pipeline.addPolicy({
      name: "Other409Error",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: { odataError: { code: "TableBeingDeleted" } },
        };
        throw new RestError("TableBeingDeleted", { statusCode: 409, response: mockedResponse });
      },
    });

    try {
      await client.createTable();
      assert.fail("Expected error");
    } catch (error) {
      assert.equal((error as RestError).statusCode, 409);
    }
  });
});

describe("TableServiceClient CreationHandling", () => {
  let client: TableServiceClient;
  beforeEach(function () {
    if (isPlaybackMode()) {
      env.SAS_CONNECTION_STRING =
        recordedEnvironmentSetup.replaceableVariables["SAS_CONNECTION_STRING"];
    }
    client = createTableServiceClient();
  });

  it("should not thorw if table already exists", async function () {
    const tableName = `tableExists`;
    // Mock core-client throwing on error to verify consistenty that don't throw the error
    client.pipeline.addPolicy({
      name: "TableAlreadyExists",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableAlreadyExists",
            },
          },
        };
        throw new RestError("TableAlreadyExists", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });

    await client.createTable(tableName, {
      onResponse: (response) => {
        assert.equal(response.status, 409);
      },
    });
  });

  it("should throw when 409 and not TableAlreadyExists", async function () {
    const tableName = `throwError`;
    // Mock core-client throwing on error to verify consistenty that we surface the error
    client.pipeline.addPolicy({
      name: "Other409Error",
      sendRequest: async (req) => {
        const mockedResponse: TableServiceErrorResponse = {
          headers: createHttpHeaders(),
          request: req,
          status: 409,
          bodyAsText: "",
          parsedBody: {
            odataError: {
              code: "TableBeingDeleted",
            },
          },
        };
        throw new RestError("TableBeingDeleted", {
          statusCode: 409,
          response: mockedResponse,
        });
      },
    });
    try {
      await client.createTable(tableName);
      assert.fail("Expected error");
    } catch (error) {
      assert.equal((error as RestError).statusCode, 409);
    }
  });
});
