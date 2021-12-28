import { Icon, Link, Text, LinkProps as ChackraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChackraLinkProps {
  children: string;
  icon: ElementType;
};

export function NavLink({ children, icon, ...rest }: NavLinkProps) {
  return (
    <Link
      display='flex'
      align='center'
      {...rest}
    >
      <Icon
        as={ icon }
        fontSize='20'
      />
      <Text
        ml='4'
        fontWeight='medium'
      >
        { children }
      </Text>
    </Link>
  );
};