import { useCounterStore } from "@/store/module/counter";
import { useUserStore } from "@/store/module/useUserStore";

export default function useStore() {
  return { useCounterStore, useUserStore };
}
