import {MeetingsStatus} from "@/modules/meetings/types";
import {CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon, VideoIcon} from "lucide-react";
import {useMeetingsFilters} from "@/modules/meetings/hooks/use-meetings-filters";
import {CommandSelect} from "@/components/command-select";

const options = [
    {
        id: MeetingsStatus.Upcoming,
        value: MeetingsStatus.Upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {MeetingsStatus.Upcoming}
            </div>
        )
    },
    {
        id: MeetingsStatus.Completed,
        value: MeetingsStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon />
                {MeetingsStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingsStatus.Active,
        value: MeetingsStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon />
                {MeetingsStatus.Active}
            </div>
        )
    },
    {
        id: MeetingsStatus.Processing,
        value: MeetingsStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon />
                {MeetingsStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingsStatus.Canceled,
        value: MeetingsStatus.Canceled,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon />
                {MeetingsStatus.Canceled}
            </div>
        )
    }
];

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();

    return (
        <CommandSelect
            placeholder="Status"
            className="h-9"
            options={options}
            onSelect={(value) => setFilters({ status: value as MeetingsStatus})}
            value={filters.status ?? ''}
        />
    )
}