/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.UploadedDocumentInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.createMany(input as any))),

        create: procedure.input($Schema.UploadedDocumentInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.create(input as any))),

        deleteMany: procedure.input($Schema.UploadedDocumentInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.deleteMany(input as any))),

        delete: procedure.input($Schema.UploadedDocumentInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.delete(input as any))),

        findFirst: procedure.input($Schema.UploadedDocumentInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).uploadedDocument.findFirst(input as any))),

        findMany: procedure.input($Schema.UploadedDocumentInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).uploadedDocument.findMany(input as any))),

        findUnique: procedure.input($Schema.UploadedDocumentInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).uploadedDocument.findUnique(input as any))),

        updateMany: procedure.input($Schema.UploadedDocumentInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.updateMany(input as any))),

        update: procedure.input($Schema.UploadedDocumentInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).uploadedDocument.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.UploadedDocumentCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.UploadedDocumentCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UploadedDocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UploadedDocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UploadedDocumentGetPayload<T>, Context>) => Promise<Prisma.UploadedDocumentGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.UploadedDocumentDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.UploadedDocumentDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UploadedDocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UploadedDocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UploadedDocumentGetPayload<T>, Context>) => Promise<Prisma.UploadedDocumentGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.UploadedDocumentFindFirstArgs, TData = Prisma.UploadedDocumentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.UploadedDocumentFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UploadedDocumentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UploadedDocumentFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UploadedDocumentFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UploadedDocumentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UploadedDocumentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.UploadedDocumentFindManyArgs, TData = Array<Prisma.UploadedDocumentGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.UploadedDocumentFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.UploadedDocumentGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UploadedDocumentFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UploadedDocumentFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.UploadedDocumentGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.UploadedDocumentGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.UploadedDocumentFindUniqueArgs, TData = Prisma.UploadedDocumentGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.UploadedDocumentFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.UploadedDocumentGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.UploadedDocumentFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.UploadedDocumentFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.UploadedDocumentGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.UploadedDocumentGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.UploadedDocumentUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.UploadedDocumentUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.UploadedDocumentUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.UploadedDocumentGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.UploadedDocumentGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.UploadedDocumentUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.UploadedDocumentUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.UploadedDocumentGetPayload<T>, Context>) => Promise<Prisma.UploadedDocumentGetPayload<T>>
            };

    };
}
