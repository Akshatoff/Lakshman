export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Address: {
        Row: {
          addressLine1: string
          addressLine2: string | null
          city: string
          country: string
          createdAt: string
          fullName: string
          id: number
          isDefault: boolean
          phone: string
          state: string
          type: string
          updatedAt: string
          userId: string
          zipCode: string
        }
        Insert: {
          addressLine1: string
          addressLine2?: string | null
          city: string
          country?: string
          createdAt?: string
          fullName: string
          id?: number
          isDefault?: boolean
          phone: string
          state: string
          type?: string
          updatedAt: string
          userId: string
          zipCode: string
        }
        Update: {
          addressLine1?: string
          addressLine2?: string | null
          city?: string
          country?: string
          createdAt?: string
          fullName?: string
          id?: number
          isDefault?: boolean
          phone?: string
          state?: string
          type?: string
          updatedAt?: string
          userId?: string
          zipCode?: string
        }
        Relationships: [
          {
            foreignKeyName: "Address_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Cart: {
        Row: {
          createdAt: string
          id: number
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Cart_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      CartItem: {
        Row: {
          cartId: number
          createdAt: string
          id: number
          productId: number
          quantity: number
          updatedAt: string
        }
        Insert: {
          cartId: number
          createdAt?: string
          id?: number
          productId: number
          quantity?: number
          updatedAt: string
        }
        Update: {
          cartId?: number
          createdAt?: string
          id?: number
          productId?: number
          quantity?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "CartItem_cartId_fkey"
            columns: ["cartId"]
            isOneToOne: false
            referencedRelation: "Cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CartItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Category: {
        Row: {
          createdAt: string
          description: string | null
          id: number
          image: string | null
          isActive: boolean
          name: string
          slug: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          isActive?: boolean
          name: string
          slug: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: number
          image?: string | null
          isActive?: boolean
          name?: string
          slug?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Order: {
        Row: {
          billingAddressId: number | null
          createdAt: string
          deliveredAt: string | null
          discount: number
          id: number
          notes: string | null
          orderNumber: string
          paymentMethod: string | null
          paymentStatus: string
          shippedAt: string | null
          shipping: number
          shippingAddressId: number | null
          status: string
          subtotal: number
          tax: number
          totalAmount: number
          trackingNumber: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          billingAddressId?: number | null
          createdAt?: string
          deliveredAt?: string | null
          discount?: number
          id?: number
          notes?: string | null
          orderNumber: string
          paymentMethod?: string | null
          paymentStatus?: string
          shippedAt?: string | null
          shipping?: number
          shippingAddressId?: number | null
          status?: string
          subtotal: number
          tax?: number
          totalAmount: number
          trackingNumber?: string | null
          updatedAt: string
          userId: string
        }
        Update: {
          billingAddressId?: number | null
          createdAt?: string
          deliveredAt?: string | null
          discount?: number
          id?: number
          notes?: string | null
          orderNumber?: string
          paymentMethod?: string | null
          paymentStatus?: string
          shippedAt?: string | null
          shipping?: number
          shippingAddressId?: number | null
          status?: string
          subtotal?: number
          tax?: number
          totalAmount?: number
          trackingNumber?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_billingAddressId_fkey"
            columns: ["billingAddressId"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_shippingAddressId_fkey"
            columns: ["shippingAddressId"]
            isOneToOne: false
            referencedRelation: "Address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      OrderItem: {
        Row: {
          createdAt: string
          id: number
          orderId: number
          priceCents: number
          productId: number
          quantity: number
          totalCents: number
        }
        Insert: {
          createdAt?: string
          id?: number
          orderId: number
          priceCents: number
          productId: number
          quantity: number
          totalCents: number
        }
        Update: {
          createdAt?: string
          id?: number
          orderId?: number
          priceCents?: number
          productId?: number
          quantity?: number
          totalCents?: number
        }
        Relationships: [
          {
            foreignKeyName: "OrderItem_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrderItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Product: {
        Row: {
          category: string
          createdAt: string
          description: string
          discount: number | null
          id: number
          image: string | null
          images: Json
          inventory: number
          isBestseller: boolean
          isFeatured: boolean
          isNew: boolean
          name: string | null
          originalPriceCents: number | null
          priceCents: number
          rating: number
          slug: string
          title: string
          updatedAt: string
        }
        Insert: {
          category: string
          createdAt?: string
          description: string
          discount?: number | null
          id?: number
          image?: string | null
          images: Json
          inventory: number
          isBestseller?: boolean
          isFeatured?: boolean
          isNew?: boolean
          name?: string | null
          originalPriceCents?: number | null
          priceCents: number
          rating?: number
          slug: string
          title: string
          updatedAt: string
        }
        Update: {
          category?: string
          createdAt?: string
          description?: string
          discount?: number | null
          id?: number
          image?: string | null
          images?: Json
          inventory?: number
          isBestseller?: boolean
          isFeatured?: boolean
          isNew?: boolean
          name?: string | null
          originalPriceCents?: number | null
          priceCents?: number
          rating?: number
          slug?: string
          title?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Review: {
        Row: {
          comment: string
          createdAt: string
          helpful: number
          id: number
          isVerified: boolean
          productId: number
          rating: number
          title: string | null
          updatedAt: string
          userId: string
        }
        Insert: {
          comment: string
          createdAt?: string
          helpful?: number
          id?: number
          isVerified?: boolean
          productId: number
          rating: number
          title?: string | null
          updatedAt: string
          userId: string
        }
        Update: {
          comment?: string
          createdAt?: string
          helpful?: number
          id?: number
          isVerified?: boolean
          productId?: number
          rating?: number
          title?: string | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Review_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Review_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          password: string | null
          phone: string | null
          role: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          role?: string
          updatedAt?: string
        }
        Relationships: []
      }
      Wishlist: {
        Row: {
          createdAt: string
          id: number
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Wishlist_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      WishlistItem: {
        Row: {
          createdAt: string
          id: number
          productId: number
          wishlistId: number
        }
        Insert: {
          createdAt?: string
          id?: number
          productId: number
          wishlistId: number
        }
        Update: {
          createdAt?: string
          id?: number
          productId?: number
          wishlistId?: number
        }
        Relationships: [
          {
            foreignKeyName: "WishlistItem_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "WishlistItem_wishlistId_fkey"
            columns: ["wishlistId"]
            isOneToOne: false
            referencedRelation: "Wishlist"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
