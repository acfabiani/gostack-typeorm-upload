import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    const { income } = await this.createQueryBuilder('trans')
      .select('SUM(trans.value)', 'income')
      .where('trans.type = :type', { type: 'income' })
      .getRawOne();

    const { outcome } = await this.createQueryBuilder('trans')
      .select('SUM(trans.value)', 'outcome')
      .where('trans.type = :type', { type: 'outcome' })
      .getRawOne();

    const total = Number(income) - Number(outcome);

    return { income: Number(income), outcome: Number(outcome), total };
  }
}

export default TransactionsRepository;
