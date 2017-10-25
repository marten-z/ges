<?php
class ProductList implements JsonSerializable {
    
    private $products;
    
    /**
     * Accept an array of entities
     *
     * @param array $data The array containing entities
     */
    public function __construct(array $data) {
        $this->products = $data;
    }
    
    public function getProducts() {
        return $this->products;
    }
    
    public function jsonSerialize() {
        return [
            'products' => $this->products
        ];
    }
}