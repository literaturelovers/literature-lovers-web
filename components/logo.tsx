import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            height={61}
            width={55}
            alt="logo"
            src="/logo.png"
            sizes="60px"
        />
    );
}

