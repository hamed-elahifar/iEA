import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Selected: () => ParameterDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const info = ctx.getArgByIndex(3);
    return info.fieldNodes[0].selectionSet.selections.map(
      (item) => item.name.value,
    );
  },
);
