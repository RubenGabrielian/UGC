"use server";

export async function createCheckout(variantId?: string) {
  console.log("!!! ACTION TEST SUCCESS !!!");
  console.log("Variant ID received:", variantId);
  return { success: true, variantId };
}