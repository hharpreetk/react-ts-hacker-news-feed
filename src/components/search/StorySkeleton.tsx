import { Card, Skeleton, Flex, Box } from "@mantine/core";

const StorySkeleton: React.FC = () => {
  const renderSkeletonLines = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <Skeleton key={index} height={15} style={{ marginBottom: "8px" }} />
    ));
  };

  const renderSkeletonText = (length: number) => {
    return Array.from({ length }).map((_, index) => (
      <Skeleton key={index} width={50} height={15} />
    ));
  };

  return (
    <Card withBorder radius="md">
      <Flex direction="column" gap={1}>
        <Flex justify="space-between" wrap="nowrap" align="start" gap="xs">
          {renderSkeletonLines(1)}
          <Box visibleFrom="xs">{renderSkeletonText(1)}</Box>
        </Flex>
        {renderSkeletonLines(1)}
        <Flex wrap="wrap" rowGap={3} columnGap="xs" align="center" mt={1}>
          {renderSkeletonText(5)}
        </Flex>
      </Flex>
    </Card>
  );
};

export default StorySkeleton;
