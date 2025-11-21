// ==========================================
// ARQUIVO: src/hooks/useSolana.ts (CRIAR NOVO)
// ==========================================
// Este hook centraliza TODAS as interações com a blockchain

import { useCallback, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  TransactionInstruction,
} from '@solana/web3.js';
import { toast } from 'sonner';

// ==========================================
// CONFIGURAÇÃO - ALTERE ESSES VALORES!
// ==========================================

// Carteira que recebe as taxas do protocolo
// SUBSTITUA pelo seu endereço de carteira!
const PROTOCOL_WALLET = new PublicKey(
  'J1vEGEqKBaT4SynekRvJpSyF7uzwZ9YiDEZJ6nEXq7V7' // Ex: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
);

// Taxas do protocolo em SOL
const PROTOCOL_FEES = {
  race: 0.0005,        // Taxa por corrida
  maintenance: 0.001,  // Taxa base de manutenção
  refuel: 0.0008,      // Taxa de abastecimento
  craft: 0.0005,       // Taxa de crafting
  mint: 0.1,           // Taxa de mint (além do preço)
  listNFT: 0.02,       // Taxa de listagem NFT
  listItem: 0.0005,    // Taxa de listagem de item
};

// ==========================================
// HOOK PRINCIPAL
// ==========================================

export function useSolana() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, connected } = useWallet();
  const [loading, setLoading] = useState(false);

  // ==========================================
  // FUNÇÃO GENÉRICA: PAGAR TAXA AO PROTOCOLO
  // ==========================================
  const payProtocolFee = useCallback(async (
    feeType: keyof typeof PROTOCOL_FEES,
    customAmountSOL?: number
  ): Promise<string | null> => {
    if (!publicKey || !signTransaction) {
      toast.error('Carteira não conectada');
      return null;
    }

    setLoading(true);

    try {
      const feeAmount = customAmountSOL ?? PROTOCOL_FEES[feeType];
      const lamports = Math.floor(feeAmount * LAMPORTS_PER_SOL);

      // Cria instrução de transferência
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: PROTOCOL_WALLET,
        lamports,
      });

      // Cria transação
      const transaction = new Transaction().add(transferInstruction);

      // Pega blockhash recente
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Assina transação
      const signedTx = await signTransaction(transaction);

      // Envia transação
      const signature = await connection.sendRawTransaction(signedTx.serialize());

      // Aguarda confirmação
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      toast.success('Transação confirmada!');
      return signature;

    } catch (error: any) {
      console.error('Erro na transação:', error);
      
      // Mensagens de erro amigáveis
      if (error.message?.includes('insufficient funds')) {
        toast.error('Saldo insuficiente de SOL');
      } else if (error.message?.includes('User rejected')) {
        toast.error('Transação cancelada');
      } else {
        toast.error('Erro na transação: ' + error.message);
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [publicKey, signTransaction, connection]);

  // ==========================================
  // AÇÕES ESPECÍFICAS DO JOGO
  // ==========================================

  // Pagar taxa de corrida
  const payRaceFee = useCallback(async () => {
    return payProtocolFee('race');
  }, [payProtocolFee]);

  // Pagar taxa de manutenção
  const payMaintenanceFee = useCallback(async (costUSD: number, solPriceUSD: number) => {
    const costInSOL = costUSD / solPriceUSD;
    return payProtocolFee('maintenance', costInSOL);
  }, [payProtocolFee]);

  // Pagar taxa de abastecimento
  const payRefuelFee = useCallback(async () => {
    return payProtocolFee('refuel');
  }, [payProtocolFee]);

  // Pagar taxa de crafting
  const payCraftFee = useCallback(async () => {
    return payProtocolFee('craft');
  }, [payProtocolFee]);

  // Pagar pelo mint de NFT
  const payMintFee = useCallback(async (priceSOL: number) => {
    return payProtocolFee('mint', priceSOL);
  }, [payProtocolFee]);

  // ==========================================
  // FUNÇÕES AUXILIARES
  // ==========================================

  // Buscar saldo de SOL
  const getSolBalance = useCallback(async (): Promise<number> => {
    if (!publicKey) return 0;
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  }, [publicKey, connection]);

  // Verificar se transação foi confirmada
  const confirmTransaction = useCallback(async (signature: string): Promise<boolean> => {
    try {
      const result = await connection.getTransaction(signature, {
        commitment: 'confirmed',
      });
      return result !== null && result.meta?.err === null;
    } catch {
      return false;
    }
  }, [connection]);

  return {
    // Estado
    connected,
    loading,
    publicKey,
    
    // Ações de pagamento
    payProtocolFee,
    payRaceFee,
    payMaintenanceFee,
    payRefuelFee,
    payCraftFee,
    payMintFee,
    
    // Utilitários
    getSolBalance,
    confirmTransaction,
    
    // Constantes
    PROTOCOL_FEES,
  };
}