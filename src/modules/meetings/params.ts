import {createLoader, parseAsInteger, parseAsString} from "nuqs/server";
import {DEFAULT_PAGE} from "@/constants";
import {parseAsStringEnum} from "nuqs/server";
import {MeetingsStatus} from "@/modules/meetings/types";

export const filtersSearchParams = {
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingsStatus)),
    agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
}

export const loadSearchParams = createLoader(filtersSearchParams);