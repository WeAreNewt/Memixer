import { useState } from "react";
import useLensProfiles from "../../../hooks/useLensProfiles";
import { User } from "../../../models/User/user.model";
import { ProfileCard } from "../../ProfileCard";

type SelectProfileProps = {
    show: boolean;
    onClose: () => void
    onProfileSelected: (profile: User) => void
}

export const SelectProfile = ({ show, onClose, onProfileSelected }: SelectProfileProps) => {
    const [selectedProfile, setSelectedProfile] = useState<User>();
    const { data } = useLensProfiles()

    const handleSelected = () => {
        if(selectedProfile) onProfileSelected(selectedProfile);
    }

    const handleProfileSelected = (profile) => {
        setSelectedProfile(profile);
    }

    return (
        <div className={show ? "block" : "hidden"}>
            <div className="absolute h-screen w-screen z-20 flex items-center justify-center bg-lime-transparent px-4 lg:px-0" /* onClick={onClose} */>
                <div className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                    <p className="text-2xl text-center font-bold whitespace-pre lg:whitespace-pre-line px-0 lg:px-8">{"Which Lens profile do\n you want to connect?"}</p>
                    {
                        data?.profiles.items.map((prof, index) => (
                            <div key={"profile-select-" + index} onClick={() => {handleProfileSelected(prof)}} className="border-b-2 border-gray-200 border-solid pb-2 mb-2 cursor-pointer">
                                <ProfileCard profile={prof} subText={`${prof.stats.totalPosts} memes created`} selected={selectedProfile === prof} />
                            </div>
                        ))
                    }
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button disabled={!selectedProfile} onClick={handleSelected} className={"rounded-full border-black border-3 border-solid bg-purple px-6 py-2 font-bold " + (!selectedProfile ? "opacity-30" : "comic-border-mini")}>Select</button>
                        <button onClick={onClose} className="comic-border-mini rounded-full bg-white px-10 py-2 font-bold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}