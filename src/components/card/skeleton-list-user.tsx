import React, { memo } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonListUserCard = memo(() => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={58} height={58} borderRadius={24} />
        <SkeletonPlaceholder.Item marginLeft={10}>
          <SkeletonPlaceholder.Item width={120} height={15} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
});

SkeletonListUserCard.displayName = "SkeletonListUserCard";

export { SkeletonListUserCard };