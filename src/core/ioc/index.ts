// noinspection ES6UnusedImports
import { Container, interfaces } from "inversify";
import { makeProvideDecorator } from "inversify-binding-decorators";
import getDecorators from "inversify-inject-decorators";
import "reflect-metadata";

export const container = new Container({ defaultScope: "Singleton" });
export const bean = makeProvideDecorator(container);
export const autowired = getDecorators(container).lazyInject;