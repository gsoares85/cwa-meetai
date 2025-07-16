import {parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates} from "nuqs";
import {DEFAULT_PAGE} from "@/constants";
import {MeetingsStatus} from "@/modules/meetings/types";

export const useMeetingsFilters = () => {
    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
        status: parseAsStringEnum(Object.values(MeetingsStatus)),
        agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    })
};