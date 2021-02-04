import {getCustomRepository} from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransctionsRepository from '../repositories/TransactionRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransctionsRepository);
    const transaction = await transactionsRepository.findOne(id);
    if(!transaction){
      throw new AppError('Transaction does not exist.');
    }
    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
