import Image from "next/image";
import { isNftImage, User } from "../../models/User/user.model";

type ProfileCardProps = {
    profile: User;
    subText: string;
    selected?: boolean;
}

export const ProfileCard = ({profile, subText, selected}: ProfileCardProps) => {
    const profilePicture = profile.picture && !isNftImage(profile.picture) ? profile.picture.original.url : "/assets/icons/profile.svg"
    return (
        <div className="flex flex-row items-center">
            <img src={profilePicture} alt="profile" className="w-12 h-12 rounded-full border-neutral-400 border-1"/>
            <div className="flex flex-col ml-2 mr-auto">
                <h3 className="text-xs -mb-0">{profile.name || profile.handle}</h3>
                <p className="text-gray-500 text-xs mb-0">{subText}</p>
            </div>
            { 
                selected ? 
                    <Image src="/assets/icons/ok.svg" width="50" height="50" alt="tick" />
                : null 
            }
        </div>
    )
}