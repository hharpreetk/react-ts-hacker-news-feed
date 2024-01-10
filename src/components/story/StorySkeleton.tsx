import { Skeleton, Flex } from "@mantine/core";
import classes from "../../styles/Skeleton.module.css";

const StorySkeleton: React.FC = () => {
  const renderSkeletonLines = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <Skeleton key={index} height={16} mb={8} />
    ));
  };

  const renderSkeletonText = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <Skeleton key={index} width={50} height={16} />
    ));
  };

  return (
    <Flex direction="column" gap={1}>
      {renderSkeletonLines(2)}
      <Flex wrap="wrap" rowGap={3} columnGap="xs" align="center" mt={1} mb="xs">
        {renderSkeletonText(4)}
      </Flex>
      <Skeleton classNames={{ root: classes.storyContent }} />
    </Flex>
  );
};

export default StorySkeleton;
