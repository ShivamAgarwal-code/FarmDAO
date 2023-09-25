import { createContext, useEffect, useState } from "react";
import detectProvider from "@metamask/detect-provider";
import Web3 from "web3";

export const Web3Context = createContext();
