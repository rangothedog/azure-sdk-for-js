/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ResourceGroupsDeleteOptionalParams,
  ResourceManagementClient
} from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 *
 * @summary When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-04-01/examples/ForceDeleteVMsAndVMSSInResourceGroup.json
 */
async function forceDeleteAllTheVirtualMachinesAndVirtualMachineScaleSetsInAResourceGroup() {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCES_RESOURCE_GROUP"] || "my-resource-group";
  const forceDeletionTypes =
    "Microsoft.Compute/virtualMachines,Microsoft.Compute/virtualMachineScaleSets";
  const options: ResourceGroupsDeleteOptionalParams = { forceDeletionTypes };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.beginDeleteAndWait(
    resourceGroupName,
    options
  );
  console.log(result);
}

/**
 * This sample demonstrates how to When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 *
 * @summary When you delete a resource group, all of its resources are also deleted. Deleting a resource group deletes all of its template deployments and currently stored operations.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2021-04-01/examples/ForceDeleteVMsInResourceGroup.json
 */
async function forceDeleteAllTheVirtualMachinesInAResourceGroup() {
  const subscriptionId =
    process.env["RESOURCES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RESOURCES_RESOURCE_GROUP"] || "my-resource-group";
  const forceDeletionTypes = "Microsoft.Compute/virtualMachines";
  const options: ResourceGroupsDeleteOptionalParams = { forceDeletionTypes };
  const credential = new DefaultAzureCredential();
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.beginDeleteAndWait(
    resourceGroupName,
    options
  );
  console.log(result);
}

async function main() {
  forceDeleteAllTheVirtualMachinesAndVirtualMachineScaleSetsInAResourceGroup();
  forceDeleteAllTheVirtualMachinesInAResourceGroup();
}

main().catch(console.error);
