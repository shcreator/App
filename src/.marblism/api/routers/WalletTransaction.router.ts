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

        createMany: procedure.input($Schema.WalletTransactionInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.createMany(input as any))),

        create: procedure.input($Schema.WalletTransactionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.create(input as any))),

        deleteMany: procedure.input($Schema.WalletTransactionInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.deleteMany(input as any))),

        delete: procedure.input($Schema.WalletTransactionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.delete(input as any))),

        findFirst: procedure.input($Schema.WalletTransactionInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).walletTransaction.findFirst(input as any))),

        findMany: procedure.input($Schema.WalletTransactionInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).walletTransaction.findMany(input as any))),

        findUnique: procedure.input($Schema.WalletTransactionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).walletTransaction.findUnique(input as any))),

        updateMany: procedure.input($Schema.WalletTransactionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.updateMany(input as any))),

        update: procedure.input($Schema.WalletTransactionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).walletTransaction.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WalletTransactionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WalletTransactionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletTransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletTransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletTransactionGetPayload<T>, Context>) => Promise<Prisma.WalletTransactionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WalletTransactionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WalletTransactionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletTransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletTransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletTransactionGetPayload<T>, Context>) => Promise<Prisma.WalletTransactionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WalletTransactionFindFirstArgs, TData = Prisma.WalletTransactionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WalletTransactionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WalletTransactionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletTransactionFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WalletTransactionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WalletTransactionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WalletTransactionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WalletTransactionFindManyArgs, TData = Array<Prisma.WalletTransactionGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.WalletTransactionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WalletTransactionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletTransactionFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WalletTransactionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WalletTransactionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WalletTransactionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WalletTransactionFindUniqueArgs, TData = Prisma.WalletTransactionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WalletTransactionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WalletTransactionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WalletTransactionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WalletTransactionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WalletTransactionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WalletTransactionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WalletTransactionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WalletTransactionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WalletTransactionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WalletTransactionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WalletTransactionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WalletTransactionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WalletTransactionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WalletTransactionGetPayload<T>, Context>) => Promise<Prisma.WalletTransactionGetPayload<T>>
            };

    };
}
