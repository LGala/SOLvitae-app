import {
    ExtensionType,
    LENGTH_SIZE,
    TOKEN_2022_PROGRAM_ID,
    TYPE_SIZE,
    createInitializeMetadataPointerInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    getMintLen,
    getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";
import {
    TokenMetadata,
    createInitializeInstruction,
    createUpdateFieldInstruction,
    pack
} from "@solana/spl-token-metadata";
import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import payerWalletSecretKey from "../../wallets/payer-secret-key.json";


export async function createMintAccountWithMetadataAndMintNFT(companyName: string, contractType: string, roleStart: string, roleEnd: string, workModel: string, jobPosition: string, jobPositionDescription: string) {
    const payer = Keypair.fromSecretKey(new Uint8Array(payerWalletSecretKey));

    // Connection to devnet cluster
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Transaction to send
    let transaction: Transaction;
    // Transaction signature returned from sent transaction
    let transactionSignature: string;


    //********* Mint Account Setup *********//

    // Generate new keypair for Mint Account
    const mintKeypair = Keypair.generate();
    // Address for Mint Account
    const mint = mintKeypair.publicKey;
    // Decimals for Mint Account
    const decimals = 2;
    // Authority that can mint new tokens
    const mintAuthority = payer.publicKey;
    // Authority that can update the metadata pointer and token metadata
    const updateAuthority = payer.publicKey;

    // Metadata to store in Mint Account
    const metaData: TokenMetadata = {
        updateAuthority: updateAuthority,
        mint: mint,
        name: "SOLVITAE",
        symbol: "SOLVITAE",
        uri: "https://github.com/riomrz/SOLvitae-api/blob/main/assets/metadata.json",
        additionalMetadata: [
            ["description", "dNFT representing the person's CV"],
            ["company name", companyName],
            ["contract type", contractType],
            ["role started", roleStart],
            ["role ended", roleEnd],
            ["work model", workModel],
            ["job position", jobPosition],
            ["job position description", jobPositionDescription],
        ],
    };

    // Size of MetadataExtension 2 bytes for type, 2 bytes for length
    const metadataExtension = TYPE_SIZE + LENGTH_SIZE;
    // Size of metadata
    const metadataLen = pack(metaData).length;

    // Size of Mint Account with extension
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    // Minimum lamports required for Mint Account
    const lamports = await connection.getMinimumBalanceForRentExemption(
        mintLen + metadataExtension + metadataLen,
    );


    //********* Build Instructions *********//

    // Instruction to invoke System Program to create new account
    const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: payer.publicKey, // Account that will transfer lamports to created account
        newAccountPubkey: mint, // Address of the account to create
        space: mintLen, // Amount of bytes to allocate to the created account
        lamports, // Amount of lamports transferred to created account
        programId: TOKEN_2022_PROGRAM_ID, // Program assigned as owner of created account
    });

    // Instruction to initialize the MetadataPointer Extension
    const initializeMetadataPointerInstruction =
        createInitializeMetadataPointerInstruction(
            mint, // Mint Account address
            updateAuthority, // Authority that can set the metadata address
            mint, // Account address that holds the metadata
            TOKEN_2022_PROGRAM_ID,
        );

    // Instruction to initialize Mint Account data
    const initializeMintInstruction = createInitializeMintInstruction(
        mint, // Mint Account Address
        decimals, // Decimals of Mint
        mintAuthority, // Designated Mint Authority
        mint, // Optional Freeze Authority
        TOKEN_2022_PROGRAM_ID, // Token Extension Program ID
    );

    // Instruction to initialize Metadata Account data
    const initializeMetadataInstruction = createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        mint: mint, // Mint Account address
        mintAuthority: mintAuthority, // Designated Mint Authority
        name: metaData.name,
        symbol: metaData.symbol,
        uri: metaData.uri,
    });

    // Instruction to update metadata, adding custom fields
    const updateDescriptionInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[0][0], // key
        value: metaData.additionalMetadata[0][1], // value
    });
    const updateCompanyNameInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[1][0], // key
        value: metaData.additionalMetadata[1][1], // value
    });
    const updateContractTypeInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[2][0], // key
        value: metaData.additionalMetadata[2][1], // value
    });
    const updateRoleStartedInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[3][0], // key
        value: metaData.additionalMetadata[3][1], // value
    });
    const updateRoleEndedInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[4][0], // key
        value: metaData.additionalMetadata[4][1], // value
    });
    const updateWorkModelInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[5][0], // key
        value: metaData.additionalMetadata[5][1], // value
    });
    const updateJobPositionInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[6][0], // key
        value: metaData.additionalMetadata[6][1], // value
    });
    const updateJobPositionDescriptionInstruction = createUpdateFieldInstruction({
        programId: TOKEN_2022_PROGRAM_ID, // Token Extension Program as Metadata Program
        metadata: mint, // Account address that holds the metadata
        updateAuthority: updateAuthority, // Authority that can update the metadata
        field: metaData.additionalMetadata[7][0], // key
        value: metaData.additionalMetadata[7][1], // value
    });


    //********* Send Transaction *********//

    // Add instructions to new transaction
    transaction = new Transaction().add(
        createAccountInstruction,
        initializeMetadataPointerInstruction,
        // note: the above instructions are required before initializing the mint
        initializeMintInstruction,
        initializeMetadataInstruction,
        updateDescriptionInstruction,
        updateCompanyNameInstruction,
        updateContractTypeInstruction,
        updateRoleStartedInstruction,
        updateRoleEndedInstruction,
        updateWorkModelInstruction,
        updateJobPositionInstruction,
        updateJobPositionDescriptionInstruction
    );

    // Send transaction
    transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer, mintKeypair], // Signers
    );

    console.log(
        "\nCreate Mint Account:",
        `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`,
    );

    // Create new Token Account, defaults to ATA
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer, // payer
        mint, // mint address
        payer.publicKey, // token account owner
        undefined,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID // SPL Token program account (needed to add metadata)
    );
    // Token account already created: GmFhtc4qBvJVxTXNP45SJEGPoUyzcFcJRp2Ru4ZzUWh9

    // Instruction to mint a single unit of the token
    const initializeMintToInstruction = createMintToInstruction(
        mint, // mint address
        tokenAccount.address, // destination
        mintAuthority, // mint authority
        1, // amount: 1 for a NFT
        [],
        TOKEN_2022_PROGRAM_ID
    );

    // Create and send transaction
    transaction = new Transaction().add(
        initializeMintToInstruction,
        //initializeSetAuthorityInstruction
    )
    transactionSignature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer], // Signers
    );

    console.log(
        "\nTransaction Signature of Token Account creation:",
        `https://solana.fm/tx/${transactionSignature}?cluster=devnet-solana`
    );
    // Last test, SOLVITAE tx signature:
    // Transaction Signature: https://solana.fm/tx/418HMK9oNavdpnQP8W8QfwqCrofyXE5nWXamP9mQSy8BmXXrxXkUk863HvokCpkMnJ6XRzLoEBNCoHpNvYsrKkGs?cluster=devnet

    console.log(
        "\nToken Account: ",
        `https://solana.fm/address/${tokenAccount.address}?cluster=devnet-solana`
    );
    // Last test, SOLVITAE Token Account:
    // Token Account:  https://solana.fm/address/ER6krr9s3h9zt33bAchR3mQXry31cZVQwsnXfDYHu64w?cluster=devnet
    console.log("dNFT created, happy coding!")
}
