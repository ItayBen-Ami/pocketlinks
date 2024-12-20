import { cn } from '@/lib/utils';
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={e => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'inline-flex h-16 items-end rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 self-center',
        className,
      )}
    >
      <div className="flex flex-row  gap-4 items-end">
        {items.map(item => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, val => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip>
      <TooltipTrigger>
        <a href={href}>
          <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-xl bg-card flex items-center justify-center"
          >
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center rounded-full"
            >
              {icon}
            </motion.div>
          </motion.div>
        </a>
      </TooltipTrigger>
      <TooltipContent className="">{title}</TooltipContent>
    </Tooltip>
  );
}
