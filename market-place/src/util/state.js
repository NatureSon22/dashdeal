import { create } from "zustand";

export const productsState = create((set) => ({
    products: [],
    setProducts: (products) => set(() => ({ products: [...products] })) 
}));

export const userCart = create((set) => ({
    cart: [],
    addToCart: (newItem) =>
        set((state) => {
            const itemExists = state.cart.some((item) => item.productId === newItem.productId);
            const updatedCart = itemExists
                ? state.cart.map((item) =>
                      item.productId === newItem.productId ? { ...item, quantity: Number(item.quantity) + 1 } : item
                  )
                : [...state.cart, { ...newItem, quantity: Number(newItem.quantity) }];
            return { cart: updatedCart };
        }),
    removeItem: (itemId) => set((state) => ({ cart: state.cart.filter((item) => item.productId !== itemId) })),
    updateQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.productId === itemId ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
        )
    })),
    updateSelected: (itemId) => set((state) => ({
        cart: state.cart.map((item) =>
            item.productId === itemId ? { ...item, selected: !item.selected } : item
        )
    })),    
    clearCart: () => set(() => ({ cart: [] })),
    setCart: (products) => set(() => ({ cart: [...products] }))
}));

export const userInventory = create((set) => ({ 
    inventory: [],
    addInventory: (item) => set((state) => ({ inventory: [ ...state.inventory, item ] })),
    updateQuantity: (itemId, quantity) => set((state) => ({
        inventory: state.inventory.map((item) =>
            item.product_id === itemId ? { ...item, quantity: quantity >= 0 ? quantity : 0 } : item
        )
    })),
    removeCart: (itemId) => set((state) => ({ inventory: state.inventory.map((item) => item.product_id == itemId ? {...item, deleted: true} : item) })),
    clearCart: () => set(() => ({ inventory: [] })),
    setInventory: (items) => set(() => ({ inventory: items })),
    setPrevious: () => set((state) => ({ previousInventory: state.inventory }))
}));


export const userOrder = create((set) => ({
    order: [],
    addOrder: (newOrder) => set((state) => ({ order: [...state.order, newOrder] })),
}))



export const saleData = () => {
    
}