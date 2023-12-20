import 'reflect-metadata';
import {Container, decorate, injectable, interfaces} from 'inversify';

/**
 * Client
 */
import AxiosHttpClient from './core/clients/axios/AxiosHttpClient';

/**
 * Provider
 */
import {SeaBankApiProvider} from './core/data/providers/seaBankApi/SeaBankApiProvider';
import DefaultSeaBankApiProvider from './core/data/providers/seaBankApi/DefaultSeaBankProvider';

/**
 * Repositories
 */
import {TransactionRepository} from './core/data/repositories/transactions/TransactionsRepository';
import DefaultTransactionRepository from './core/data/repositories/transactions/DefaultTransactionRepository';

/**
 * Use Cases
 */
import {GetTransactionsListUseCase} from './core/data/useCases/transactions/TransactionsUseCase';
import {getTransactionsListUseCase} from './core/data/useCases/transactions/getTransactionsListUseCase';
import {MASTER_KEY, SEA_BANK_API_BASE_URL} from './core/common/Constants';
import {HttpClient} from './core/clients/HttpClient';
import {BiometricsService} from './core/services/BiometricsService';
import {ReactNativeBiometricsService} from './core/services/ReactNativeBiometricsService';

const CLIENT_TYPES = {
  Http: Symbol.for('HttpClient'),
};

const PROVIDER_TYPES = {
  SeaBankApi: Symbol.for('SeaBankApiProvider'),
};

const REPOSITORY_TYPES = {
  Transaction: Symbol.for('TransactionRepository'),
};

const SERVICE_TYPES = {
  Biometrics: Symbol.for('BiometricsService'),
};

const USECASE_TYPES = {
  GetTransactionsList: Symbol.for('GetTransactionsListUseCase'),
};

export {
  CLIENT_TYPES,
  PROVIDER_TYPES,
  REPOSITORY_TYPES,
  SERVICE_TYPES,
  USECASE_TYPES,
};

export class Dependency {
  private static defaultContainer: Container;

  /**
   * Retrieves an instance of the specified type from the default dependency container.
   *
   * @template T - The type of the instance to retrieve.
   * @param {string | symbol} symbol - The identifier (string or symbol) associated with the registered dependency.
   * @returns {T} - An instance of the specified type.
   */
  public static get<T>(symbol: string | symbol): T {
    return Dependency.defaultContainer.get<T>(symbol);
  }

  public static setup(
    registerExternalDependancies?: (container: Container) => void,
    registerMockDependancies?: (container: Container) => void,
  ): Container {
    const container: Container = new Container();

    if (typeof registerExternalDependancies === 'function') {
      registerExternalDependancies(container);
    }

    Dependency.registerClients(container);
    Dependency.registerProviders(container);
    Dependency.registerRepositories(container);
    Dependency.registerServices(container);
    Dependency.registerUseCases(container);

    if (typeof registerMockDependancies === 'function') {
      registerMockDependancies(container);
    }

    Dependency.defaultContainer = container;

    return Dependency.defaultContainer;
  }

  private static registerClients(container: Container) {
    Dependency.decorateAnnotate<HttpClient>(
      container,
      CLIENT_TYPES.Http,
      () => new AxiosHttpClient(),
    );
  }

  private static registerProviders(container: Container) {
    Dependency.decorateAnnotate<SeaBankApiProvider>(
      container,
      PROVIDER_TYPES.SeaBankApi,
      context =>
        new DefaultSeaBankApiProvider(
          context.container.get(CLIENT_TYPES.Http),
          SEA_BANK_API_BASE_URL,
          MASTER_KEY,
        ),
    );
  }

  private static registerRepositories(container: Container) {
    Dependency.decorateAnnotate<TransactionRepository>(
      container,
      REPOSITORY_TYPES.Transaction,
      context =>
        new DefaultTransactionRepository(
          context.container.get(PROVIDER_TYPES.SeaBankApi),
        ),
    );
  }

  private static registerServices(container: Container) {
    Dependency.decorateAnnotate<BiometricsService>(
      container,
      SERVICE_TYPES.Biometrics,
      () => new ReactNativeBiometricsService(),
    );
  }

  private static registerUseCases(container: Container) {
    Dependency.decorateAnnotate<GetTransactionsListUseCase>(
      container,
      USECASE_TYPES.GetTransactionsList,
      context => () =>
        getTransactionsListUseCase(
          context.container.get(REPOSITORY_TYPES.Transaction),
        ),
    );
  }

  /**
   * @param {Container} container inversify container
   * @param {symbol} injectSymbol symbol of the dependency
   * @param {any} target dependency to be decorated
   */
  static decorateAnnotate<T>(
    container: Container,
    injectSymbol: symbol,
    target: (context: interfaces.Context) => T,
  ) {
    container.bind<T>(injectSymbol).toDynamicValue(target).inSingletonScope();

    decorate(injectable(), target);
  }
}
