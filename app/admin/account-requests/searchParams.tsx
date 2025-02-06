import { parseAsInteger, createLoader, parseAsString } from "nuqs/server";

export const userRequestSearchParams = {
  page: parseAsInteger.withDefault(1),
  sortBy: parseAsString.withDefault("fullName"),
  sortDirection: parseAsString.withDefault("asc"),
};

export const loadSearchParams = createLoader(userRequestSearchParams);
