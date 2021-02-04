import AppError from '../errors/AppError';
import {getCustomRepository, getRepository} from 'typeorm';
import transactionsRepository from '../repositories/transactionsRepository';
import Transaction from '../models/Transaction';


interface {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({title, value, type, category,}: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const {total} = await transactionsRepository.getBalance();
    if (type === "outcome" && total < value) {
      throw new AppError("You do not have enough balance.");
    }
    const categoryRepository = getRepository(Category);
    let transactionCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if(!transactionCategory) = categoryRepository.create({
      title: category,
    });
    await categoryRepository.save(transactionCategory);
  }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
