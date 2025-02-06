import { parseAsInteger, createLoader } from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const userRequestSearchParams = {
  page: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(userRequestSearchParams);
