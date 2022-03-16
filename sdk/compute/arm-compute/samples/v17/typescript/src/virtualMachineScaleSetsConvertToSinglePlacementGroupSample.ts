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
  VMScaleSetConvertToSinglePlacementGroupInput,
  ComputeManagementClient
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2021-11-01/examples/compute/VirtualMachineScaleSets_ConvertToSinglePlacementGroup_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsConvertToSinglePlacementGroupMaximumSetGen() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const parameters: VMScaleSetConvertToSinglePlacementGroupInput = {
    activePlacementGroupId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.convertToSinglePlacementGroup(
    resourceGroupName,
    vmScaleSetName,
    parameters
  );
  console.log(result);
}

virtualMachineScaleSetsConvertToSinglePlacementGroupMaximumSetGen().catch(
  console.error
);

/**
 * This sample demonstrates how to Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2021-11-01/examples/compute/VirtualMachineScaleSets_ConvertToSinglePlacementGroup_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsConvertToSinglePlacementGroupMinimumSetGen() {
  const subscriptionId = "{subscription-id}";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaa";
  const parameters: VMScaleSetConvertToSinglePlacementGroupInput = {};
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.convertToSinglePlacementGroup(
    resourceGroupName,
    vmScaleSetName,
    parameters
  );
  console.log(result);
}

virtualMachineScaleSetsConvertToSinglePlacementGroupMinimumSetGen().catch(
  console.error
);