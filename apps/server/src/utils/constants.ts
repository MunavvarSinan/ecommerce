import { GraphQLScalarType, Kind } from "graphql";

export const SALT_ROUNDS = process.env.NODE_ENV === 'development' ? 1 : 10;


export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Custom scalar type for DateTime',
    serialize(value: unknown): string {
        if (value instanceof Date) {
            return value.toISOString();
        }
        throw new Error('DateTime cannot represent non-Date type');
    },
    parseValue(value: unknown): Date {
        const date = new Date(value as string);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid DateTime value');
        }
        return date;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const date = new Date(ast.value);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid DateTime value');
            }
            return date;
        }
        throw new Error('DateTime cannot represent non-string type');
    },
});